import 'server-only';
import { gql } from 'graphql-request';
import { cacheLife, cacheTag } from 'next/cache';

import { cacheTags } from '@/config/cacheTags';

import type { BlogMeta } from './Blog';
import type {
  BlogFragment as BlogFragmentType,
  BlogsQuery,
  BlogsQueryVariables,
} from './DatoCMS';

import { datoClient } from './datoClient';
import { BlogFragment } from './Fragments';

const query = gql`
  ${BlogFragment}

  query Blogs {
    allBlogs {
      ...Blog
    }
  }
`;

const toBlog = (b: BlogFragmentType): BlogMeta => {
  return {
    title: b.title!,
    slug: b.slug!,
    createdAt: new Date(b.createdAt!),
  };
};

export const getBlogs = async (): Promise<BlogMeta[]> => {
  'use cache';

  cacheLife('max');
  cacheTag(cacheTags.blogs());

  const data = await datoClient.request<BlogsQuery, BlogsQueryVariables>(query);

  if (!data.allBlogs) return [];

  return data.allBlogs.map(toBlog);
};
