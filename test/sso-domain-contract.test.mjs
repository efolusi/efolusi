import { readFileSync } from 'node:fs'

import { expect, test } from 'vitest'

import nextConfig from '../next.config.mjs'

const header = readFileSync(new URL('../app/components/SiteHeader.jsx', import.meta.url), 'utf8')
const nextConfigSource = readFileSync(new URL('../next.config.mjs', import.meta.url), 'utf8')
const legacySsoApi = /https:\/\/(?:accounts|sso)-api\.efolusi\.com/

test('sign-in links use the canonical my domain and no session is read', () => {
  expect(header).toMatch(/const my = \{ web: 'https:\/\/my\.efolusi\.com' \}/)
  // The landing reads no session: my-api does not allow this origin (CORS), and my.efolusi.com
  // sends a signed-in visitor on to their account.
  expect(header).not.toMatch(/get-session|my-api/)
  expect(header).toMatch(/\$\{my\.web\}\/sign-in/)
  expect(header).not.toMatch(/https:\/\/accounts(?:-api)?\.efolusi\.com/)
})

test('no host signs in against a development issuer', () => {
  expect(header).not.toMatch(/dev-my/)
  expect(nextConfigSource).not.toMatch(/dev-my-api|dev\.efolusi\.com/)
})

test('CSP names no SSO API and allows the Cloudflare beacon', async () => {
  expect(legacySsoApi.test('https://accounts-api.efolusi.com')).toBe(true)
  expect(legacySsoApi.test('https://sso-api.efolusi.com')).toBe(true)
  expect(nextConfigSource).not.toMatch(legacySsoApi)

  const rules = await nextConfig.headers()
  const cspRules = rules.flatMap((rule) =>
    rule.headers.filter((h) => h.key === 'Content-Security-Policy').map((h) => ({ has: rule.has, value: h.value }))
  )
  expect(cspRules).toHaveLength(1)
  expect(cspRules[0].value).toMatch(/connect-src 'self' https:\/\/cloudflareinsights\.com /)
  expect(cspRules[0].value).not.toMatch(/my-api/)
})
