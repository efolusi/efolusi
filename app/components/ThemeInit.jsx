'use client';

import { themeInitScript } from '@efolusi/meridian';

/* Meridian ships themeInitScript in a client module, so server layouts render it through here.
   The browser hides a nonce after load; suppressHydrationWarning keeps that from reading as a mismatch. */
export default function ThemeInit({ nonce }) {
  return <script nonce={nonce} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: themeInitScript() }} />;
}
