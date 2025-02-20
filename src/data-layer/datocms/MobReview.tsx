import type { ResponsiveImageType } from 'react-datocms';

import type { EventLinks } from './EventLinks';

export interface MobReviewEvent {
  thumbnail: ResponsiveImageType;
  heading: any;
  description: any;
  links: EventLinks;
}
