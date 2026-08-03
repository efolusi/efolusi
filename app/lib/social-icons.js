/* Social marks come from Meridian (1.19.0): all three filled, so a follow-us
   row reads as one family. This wrapper only maps display labels to glyph
   names so call sites can keep saying "LinkedIn" and "X". */
import { Icon } from '@efolusi/meridian';

const GLYPHS = { LinkedIn: 'linkedin', GitHub: 'github-brand', X: 'x-brand' };

export function SocialIcon({ name, size = 18 }) {
  return <Icon name={GLYPHS[name]} size={size} />;
}
