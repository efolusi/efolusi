import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const FULL_ACTION_SHA = /^[^@\s]+@[0-9a-f]{40}$/;
const POSIX_ABSOLUTE_PATH = /(?:^|[\s"'=;|&()])\/(?!\/)[^\s"';|&()]*/;
const CREDENTIAL_LITERAL = /(?:postgres(?:ql)?|redis|https?):\/\/[^/\s:@]+:[^@\s/]+@|"(?:password|secret|token|api[_-]?key|database_url)"\s*:\s*"(?!\$)[^"]+"|(?:PASSWORD|SECRET|TOKEN|API_KEY|DATABASE_URL)=(?!\$)[^"'\s]+/i;

function permissionMaps(workflow) {
  const lines = workflow.split(/\r?\n/);
  const maps = [];

  for (let index = 0; index < lines.length; index += 1) {
    const match = lines[index].match(/^(\s*)permissions:\s*(.*)$/);
    if (!match) continue;
    const indent = match[1].length;
    const inline = match[2].replace(/\s+#.*$/, '').trim();
    const entries = [];

    if (inline) {
      if (!/^\{.*\}$/.test(inline)) throw new Error('permissions must be a mapping');
      for (const entry of inline.slice(1, -1).split(',')) {
        const pair = entry.trim().match(/^([a-z-]+):\s*([a-z-]+)$/);
        if (!pair) throw new Error('invalid inline permission');
        entries.push([pair[1], pair[2]]);
      }
    } else {
      while (index + 1 < lines.length) {
        const next = lines[index + 1];
        if (!next.trim() || /^\s*#/.test(next)) {
          index += 1;
          continue;
        }
        const nextIndent = next.match(/^\s*/)[0].length;
        if (nextIndent <= indent) break;
        const pair = next.trim().replace(/\s+#.*$/, '').match(/^([a-z-]+):\s*([a-z-]+)$/);
        if (!pair) throw new Error('invalid block permission');
        entries.push([pair[1], pair[2]]);
        index += 1;
      }
    }
    maps.push(Object.fromEntries(entries));
  }
  return maps;
}

function validateWorkflow(workflow, { allowActionsRead = false } = {}) {
  const uses = [...workflow.matchAll(/^\s*(?:-\s*)?uses:\s*([^\s#]+)/gm)].map((match) => match[1]);
  if (!uses.every((value) => FULL_ACTION_SHA.test(value))) {
    throw new Error('every step-level and job-level action must use a lowercase 40-hex SHA');
  }

  const maps = permissionMaps(workflow);
  if (maps.length === 0) throw new Error('explicit permissions required');
  for (const permissions of maps) {
    const entries = Object.entries(permissions).sort(([left], [right]) => left.localeCompare(right));
    const allowed = allowActionsRead
      ? [["actions", "read"], ["contents", "read"]]
      : [["contents", "read"]];
    if (JSON.stringify(entries) !== JSON.stringify(allowed)) {
      throw new Error('permissions exceed the exact least-privilege allowlist');
    }
  }
}

function validateLauncher(launcher) {
  function inspect(value, key = '') {
    if (typeof value === 'string') {
      if (POSIX_ABSOLUTE_PATH.test(value)) throw new Error('absolute POSIX path');
      if (CREDENTIAL_LITERAL.test(value)) throw new Error('credential literal');
      if (/^(?:password|secret|token|api[_-]?key|database_url)$/i.test(key)
          && value !== '' && !/^\$\{?[A-Z_][A-Z0-9_]*\}?$/.test(value)) {
        throw new Error('credential literal');
      }
      return;
    }
    if (Array.isArray(value)) {
      for (const item of value) inspect(item, key);
      return;
    }
    if (value && typeof value === 'object') {
      for (const [childKey, childValue] of Object.entries(value)) inspect(childValue, childKey);
    }
  }
  inspect(launcher);
}

describe('tracked development launcher boundary', () => {
  it('contains only an env-indirected example and ignores the local launcher', () => {
    const example = readFileSync('.claude/launch.example.json', 'utf8');
    const parsed = JSON.parse(example);
    const serialized = JSON.stringify(parsed);
    expect(() => validateLauncher(parsed)).not.toThrow();
    expect(serialized).toContain('$SSO_REPO_DIR');
    expect(serialized).toContain('$SSO_ENV_FILE');
    expect(readFileSync('.gitignore', 'utf8').split(/\r?\n/)).toContain('.claude/launch.json');
    expect(existsSync('.claude/launch.json')).toBe(false);
  });

  it('rejects general absolute paths and credential literals', () => {
    const launcher = (runtimeArgs) => ({ configurations: [{ runtimeExecutable: 'sh', runtimeArgs }] });
    expect(() => validateLauncher(launcher(['/Users/attacker/repo/start']))).toThrow('absolute POSIX path');
    expect(() => validateLauncher(launcher(['/srv/private-service/start']))).toThrow('absolute POSIX path');
    expect(() => validateLauncher(launcher(['/data/private-service/start']))).toThrow('absolute POSIX path');
    expect(() => validateLauncher(launcher(['PASSWORD=dev-secret']))).toThrow('credential literal');
    expect(() => validateLauncher(launcher(['https://example.test/private-service']))).not.toThrow();
    expect(() => validateLauncher({ configurations: [{ cwd: '/srv/private-service' }] })).toThrow('absolute POSIX path');
    expect(() => validateLauncher({ configurations: [{ env: { CONFIG_PATH: '/data/private.env' } }] })).toThrow('absolute POSIX path');
    expect(() => validateLauncher({ configurations: [{ env: { DATABASE_URL: 'postgres://user:pass@example.test/db' } }] })).toThrow('credential literal');
    expect(() => validateLauncher({ configurations: [{ env: { PUBLIC_URL: 'https://example.test/private-service' } }] })).not.toThrow();
  });
});

describe('CI action provenance', () => {
  it('uses least privilege and only full-SHA action references in every workflow', () => {
    const workflowFiles = readdirSync('.github/workflows')
      .filter((file) => /\.ya?ml$/.test(file))
      .sort();
    expect(workflowFiles.length).toBeGreaterThan(0);

    for (const file of workflowFiles) {
      const workflow = readFileSync(`.github/workflows/${file}`, 'utf8');
      expect(() => validateWorkflow(workflow, { allowActionsRead: file === 'foundation-release.yml' }), file).not.toThrow();
    }

    const ci = readFileSync('.github/workflows/ci.yml', 'utf8');
    expect(ci).toMatch(/push:\s*\n\s+branches: \[main, dev\]/);
    expect(ci).toMatch(/pull_request:\s*\n\s+branches: \[dev\]/);
  });

  it('rejects job-level mutable actions and write permissions', () => {
    const hostile = `permissions: {contents: read}
jobs:
  bypass:
    permissions: {contents: read, id-token: write}
    uses: owner/action@v1
`;
    expect(() => validateWorkflow(hostile)).toThrow();
  });

  it('accepts a workflow with no third-party actions and exact read permission', () => {
    const nativeOnly = `permissions: {contents: read}
jobs:
  deploy:
    runs-on: [self-hosted]
    steps:
      - run: /home/deploy/bin/efolusi-deploy
`;
    expect(() => validateWorkflow(nativeOnly)).not.toThrow();
  });
});
