import { readFileSync } from 'node:fs'

import { expect, test } from 'vitest'

const nginx = readFileSync(new URL('../infra/nginx/efolusi-prod.conf', import.meta.url), 'utf8')

test('redirects HTTP and HTTPS www traffic to the canonical apex without changing the apex upstream', () => {
  expect(nginx).toMatch(/listen 80;[\s\S]*server_name efolusi\.com www\.efolusi\.com;[\s\S]*return 301 https:\/\/efolusi\.com\$request_uri;/)
  expect(nginx).toMatch(/listen 443 ssl;[\s\S]*server_name www\.efolusi\.com;[\s\S]*return 301 https:\/\/efolusi\.com\$request_uri;/)
  expect(nginx).toMatch(/server_name efolusi\.com;[\s\S]*proxy_pass http:\/\/127\.0\.0\.1:3000;/)
  expect(nginx.match(/proxy_pass/g)).toHaveLength(1)
})

test('keeps both HTTPS vhosts on the existing Efolusi origin certificate', () => {
  expect(nginx.match(/ssl_certificate \/etc\/nginx\/ssl\/efolusi\.com\.pem;/g)).toHaveLength(2)
  expect(nginx.match(/ssl_certificate_key \/etc\/nginx\/ssl\/efolusi\.com\.key;/g)).toHaveLength(2)
})
