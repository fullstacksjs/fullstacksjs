import 'server-only';
import { gql } from 'graphql-request';
import { cacheTag } from 'next/cache';

import { cacheTags } from '@/config/cacheTags';

import type { Blog } from './Blog';
import type {
  BlogContentFragment as BlogContentFragmentType,
  BlogFragment as BlogFragmentType,
  BlogQuery,
  BlogQueryVariables,
  ImageFragment as ImageFragmentType,
  Maybe,
} from './DatoCMS';

import { datoClient } from './datoClient';
import { BlogContentFragment, BlogFragment, ImageFragment } from './Fragments';

const query = gql`
  ${BlogFragment}
  ${BlogContentFragment}
  ${ImageFragment}

  query Blog($slug: String!) {
    blog(filter: { slug: { eq: $slug } }) {
      banner {
        responsiveImage {
          ...Image
        }
      }
      ...Blog
      content {
        ...BlogContent
      }
    }
  }
`;

const toBlog = (
  b: BlogFragmentType & {
    banner?: Maybe<{ responsiveImage?: Maybe<ImageFragmentType> }>;
    content?: Maybe<BlogContentFragmentType>;
  },
): Blog | undefined => {
  if (!b.banner?.responsiveImage || !b.content) return undefined;

  return {
    banner: b.banner.responsiveImage,
    content: b.content,
    title: b.title!,
    slug: b.slug!,
    createdAt: new Date(b.createdAt!),
  };
};

export const getBlog = async (slug: string): Promise<Blog | undefined> => {
  'use cache';
  cacheTag(cacheTags.blog(slug));

  const { blog } = await datoClient.request<BlogQuery, BlogQueryVariables>(
    query,
    { slug },
  );

  if (!blog) return undefined;

  return toBlog(blog);
};
