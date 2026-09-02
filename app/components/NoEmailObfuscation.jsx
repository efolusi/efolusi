/* Cloudflare's Email Address Obfuscation rewrites plaintext emails and
mailto: links in the HTML it proxies (into __cf_email__ spans plus an injected
email-decode script). That makes the served HTML differ from what React
rendered on the server, and hydration fails with minified React error #418.

Wrapping an email in <!--email_off--> ... <!--/email_off--> comments is
Cloudflare's documented opt-out for a fragment. JSX cannot emit comment nodes
directly, so these sentinels render them via dangerouslySetInnerHTML — whose
contents React never diffs during hydration. */

const off = { __html: '<!--email_off-->' };
const on = { __html: '<!--/email_off-->' };

export default function NoEmailObfuscation({ children }) {
  return (
    <>
      <span style={{ display: 'none' }} dangerouslySetInnerHTML={off} />
      {children}
      <span style={{ display: 'none' }} dangerouslySetInnerHTML={on} />
    </>
  );
}
