import { Icon } from '@efolusi/meridian';
import SiteHeader from '../components/SiteHeader.jsx';
import SiteFooter from '../components/SiteFooter.jsx';

export const metadata = {
  title: 'Careers · Efolusi',
  description:
    'Work with Efolusi, a software studio from Indonesia building independent products across AI, infrastructure, productivity, content, social and trading.',
  alternates: { canonical: '/careers' }
};

const roles = [
  ['Senior Go Engineer', 'Remote · Full-time'],
  ['Product Designer', 'Remote · Full-time'],
  ['AI Research Engineer', 'Remote · Full-time'],
  ['Growth Lead', 'Indonesia · Full-time']
];

const workingHere = [
  [
    'briefcase',
    'Real ownership',
    'Products here are small teams with full stacks. You ship things users touch the same month, not tickets in a queue.'
  ],
  [
    'globe',
    'Distributed by default',
    "We're headquartered in Indonesia and work async across timezones. Output matters; hours don't."
  ],
  [
    'sparkles',
    'Craft over ceremony',
    'One standard across everything we ship. Code review is real, design review is real, and "good enough" has to actually be good.'
  ],
  [
    'trending-up',
    'A growing portfolio',
    'New products mean new problems to own, not reorgs to survive.'
  ]
];

export default function CareersPage() {
  return (
    <>
      <SiteHeader />

      <main>
        <section className="page-hero">
          <div className="wrap">
            <h1>
              Care deeply about craft? <span className="script accent">Let's build.</span>
            </h1>
            <p className="page-lede">
              We're always happy to meet people who love building useful things. Browse the open roles, or just say hi; the best people we've worked with rarely fit a listing exactly.
            </p>
          </div>
        </section>

        <section className="csec csec--rule">
          <div className="wrap">
            <div className="csec-head">
              <h2>
                What it's <span className="script accent">actually like</span>.
              </h2>
            </div>
            <div className="ruled-cells" data-cols="2" style={{ marginTop: 36 }}>
              {workingHere.map(([icon, title, body], index) => (
                <div className="perk" key={title}>
                  <span className={`tick tick--${['caramel', 'green', 'amber', 'coral'][index % 4]}`}>
                    <Icon name={icon} size={16} />
                  </span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="csec csec--rule">
          <div className="wrap">
            <div className="careers-grid">
              <div>
                <h2 className="section-title">
                  Where we're <span className="script accent">hiring now</span>.
                </h2>
                <p className="body">Every application gets read by a human. Tell us what you've built and what you want to build next; a portfolio or repo beats a long CV.</p>
                <a className="pill pill--primary" href="/#contact">
                  Reach out about a role
                  <span className="pill-arrow">
                    <Icon name="arrow-up-right" size={16} />
                  </span>
                </a>
              </div>

              <div className="roles">
                {roles.map(([title, meta]) => (
                  <a className="role" href="/#contact" key={title}>
                    <div>
                      <div className="rt">{title}</div>
                      <div className="rm">{meta}</div>
                    </div>
                    <span className="role-arrow">
                      <Icon name="arrow-right" size={18} />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="band closer">
          <div className="wrap">
            <h2>
              Don't see <span className="script" style={{ color: 'var(--brand-300)' }}>your role</span>?
            </h2>
            <p>Write to us anyway. If you care about useful software and can show it, we want to hear from you.</p>
            <div className="closer-actions">
              <a className="pill pill--cream" href="/#contact">
                Say hi
                <span className="pill-arrow">
                  <Icon name="arrow-up-right" size={16} />
                </span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
