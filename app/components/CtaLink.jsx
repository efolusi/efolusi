'use client';

import { Icon, buttonVariants } from '@efolusi/meridian';

/* The site's call-to-action link: Meridian's xl pill button as a link (52 px, the hero size).
   `primary` is the copper button, `secondary` the outlined one, `band` the cream button for the
   cream band and the dark band. `primary` and `band` end in the arrow bubble (Meridian `iconBubble`
   for a link: `bubble` in buttonVariants plus the `ef-btn__bubble` span); `secondary` has none.
   `data-turn` on the span makes the up-right arrow turn 45 degrees on hover and keyboard focus (Meridian 2.6.0).
   The bubble takes the label colour and the arrow takes the button colour, so it reads in light and dark. */
export default function CtaLink({ variant = 'primary', bubble = variant !== 'secondary', as: Tag = 'a', className, children, ...rest }) {
  return (
    <Tag className={buttonVariants({ variant, size: 'xl', shape: 'pill', bubble, className })} {...rest}>
      {children}
      {bubble ? (
        <span className="ef-btn__bubble" data-turn aria-hidden="true">
          <Icon name="arrow-up-right" size={20} />
        </span>
      ) : null}
    </Tag>
  );
}
