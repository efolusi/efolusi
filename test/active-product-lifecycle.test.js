import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const activeProductSurfaces = [
  '../app/[lang]/layout.js',
  '../app/components/HomeClient.jsx',
  '../app/dictionaries/en.js',
  '../app/dictionaries/id.js',
  '../app/llms.txt/route.js'
];

const retiredProductNames = ['EarthOS', 'Nova', 'Nexus', 'PaySwitch'];

describe('active product lifecycle', () => {
  it.each(activeProductSurfaces)('%s does not promote retired products', (relativePath) => {
    const path = fileURLToPath(new URL(relativePath, import.meta.url));
    const source = readFileSync(path, 'utf8');

    for (const name of retiredProductNames) {
      expect(source, `${relativePath} still presents ${name} as active`).not.toMatch(
        new RegExp(`\\b${name}\\b`, 'i')
      );
    }
  });
});
