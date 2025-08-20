import type { ImageFragment } from './DatoCMS';

export interface BlogMeta {
  title: string;
  slug: string;
  createdAt: Date;
}

export interface Blog extends BlogMeta {
  banner: ImageFragment;
  content: any;
}
