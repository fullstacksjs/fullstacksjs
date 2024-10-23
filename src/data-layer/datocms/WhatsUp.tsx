import type { ResponsiveImageType } from 'react-datocms';

import type { EventLinks } from './EventLinks';

export interface WhatsUpEvent {
  thumbnail: ResponsiveImageType;
  heading: any;
  description: any;
  links: EventLinks;
}
