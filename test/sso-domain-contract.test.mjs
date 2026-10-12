import { readFileSync } from 'node:fs'

import { expect, test } from 'vitest'

import nextConfig from '../next.config.mjs'

const header = readFileSync(new URL('../app/components/SiteHeader.jsx', import.meta.url), 'utf8')
const nextConfigSource = readFileSync(new URL('../next.config.mjs', import.meta.url), 'utf8')
const legacySsoApi = /https:\/\/(?:accounts|sso)-api\.efolusi\.com/

test('foundation links and session reads use the canonical my domains', () => {
  expect(header).toMatch(/prod: \{ web: 'https:\/\/my\.efolusi\.com', api: 'https:\/\/my-api\.efolusi\.com' \}/)
  expect(header).toMatch(/\/api\/auth\/get-session/)
  expect(header).toMatch(/\$\{my\.web\}\/account/)
  expect(header).toMatch(/\$\{my\.web\}\/sign-in/)
  expect(header).not.toMatch(/https:\/\/accounts(?:-api)?\.efolusi\.com/)
})

test('only the development site uses the My Efolusi development issuer', () => {
  expect(header).toMatch(/dev: \{ web: 'https:\/\/dev-my\.efolusi\.com', api: 'https:\/\/dev-my-api\.efolusi\.com' \}/)
  // Exact host match: no other dev-looking host is trusted with the dev issuer.
  expect(header).toMatch(/hostname === 'dev\.efolusi\.com' \? MY_ORIGINS\.dev : MY_ORIGINS\.prod/)
})

test('CSP permits only the canonical SSO API domain, and the dev API only on the dev host', async () => {
  expect(legacySsoApi.test('https://accounts-api.efolusi.com')).toBe(true)
  expect(legacySsoApi.test('https://sso-api.efolusi.com')).toBe(true)
  expect(nextConfigSource).not.toMatch(legacySsoApi)

  const rules = await nextConfig.headers()
  const cspRules = rules.flatMap((rule) =>
    rule.headers.filter((h) => h.key === 'Content-Security-Policy').map((h) => ({ has: rule.has, value: h.value }))
  )
  const everywhere = cspRules.find((r) => !r.has)
  const devOnly = cspRules.find((r) => r.has?.some((c) => c.type === 'host' && c.value === 'dev.efolusi.com'))
  expect(everywhere.value).toMatch(/connect-src 'self' https:\/\/my-api\.efolusi\.com /)
  expect(everywhere.value).not.toMatch(/dev-my-api/)
  expect(devOnly.value).toMatch(/connect-src 'self' https:\/\/dev-my-api\.efolusi\.com /)
  // The dev rule must come after the general one so it overrides it on that host.
  expect(cspRules.indexOf(devOnly)).toBeGreaterThan(cspRules.indexOf(everywhere))
})
