import { readFileSync } from 'node:fs'

import { expect, test } from 'vitest'

const header = readFileSync(new URL('../app/components/SiteHeader.jsx', import.meta.url), 'utf8')
const nextConfig = readFileSync(new URL('../next.config.mjs', import.meta.url), 'utf8')
const legacySsoApi = /https:\/\/(?:accounts|sso)-api\.efolusi\.com/

test('foundation links and session reads use the canonical my domains', () => {
  expect(header).toMatch(/https:\/\/my-api\.efolusi\.com\/api\/auth\/get-session/)
  expect(header).toMatch(/https:\/\/my\.efolusi\.com\/account/)
  expect(header).toMatch(/https:\/\/my\.efolusi\.com\/sign-in/)
  expect(header).not.toMatch(/https:\/\/accounts(?:-api)?\.efolusi\.com/)
})

test('CSP permits only the canonical SSO API domain', () => {
  expect(nextConfig).toMatch(/https:\/\/my-api\.efolusi\.com/)
  expect(legacySsoApi.test('https://accounts-api.efolusi.com')).toBe(true)
  expect(legacySsoApi.test('https://sso-api.efolusi.com')).toBe(true)
  expect(nextConfig).not.toMatch(legacySsoApi)
})
