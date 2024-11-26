import type { ResponsiveImageType } from 'react-datocms';

import type { EventLinks } from './EventLinks';

export interface StageEvent {
  thumbnail: ResponsiveImageType;
  heading: any;
  description: any;
  links: EventLinks;
}
