import { gql } from 'graphql-request';
import { unstable_cacheTag as cacheTag } from 'next/cache';
import 'server-only';

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
  cacheTag('blogs');

  const data = await datoClient.request<BlogsQuery, BlogsQueryVariables>(query);

  if (!data.allBlogs) return [];

  return data.allBlogs.map(toBlog);
};
