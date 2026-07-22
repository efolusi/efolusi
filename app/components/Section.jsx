/* The ledger section: a full-width hairline, then a fixed left rail carrying
   the section's name and one true fact, with the content in the body column.
   The rail is structure that informs; it never carries decorative numbering. */
export default function Section({ id, label, fact, className = '', children }) {
  return (
    <section id={id} className={`sec ${className}`.trim()}>
      <div className="wrap sec-grid">
        <div className="sec-rail">
          <span className="sec-label">{label}</span>
          {fact ? <span className="sec-fact">{fact}</span> : null}
        </div>
        <div className="sec-body">{children}</div>
      </div>
    </section>
  );
}
