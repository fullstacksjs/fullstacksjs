import type { ResponsiveImageType } from 'react-datocms/image';

export interface Lecturer {
  name: string;
  avatar: ResponsiveImageType;
}

export interface FullstacksJSEvent {
  slug: string;
  title: any;
  date: Date;
  thumbnail: ResponsiveImageType;
  subscribersCount?: number;
  lecturers: Lecturer[];
}
