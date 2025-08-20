import { gql } from 'graphql-request';

import type { EventFragment as EventFragmentType } from './DatoCMS';

export const ImageFragment = gql`
  fragment Image on ResponsiveImage {
    src
    width
    height
    alt
    title
    base64
    bgColor
    sizes
  }
`;

export const EventFragment = gql`
  ${ImageFragment}

  fragment Event on EventRecord {
    slug
    startDate
    mediaUrl
    title {
      value
      links
      blocks
    }
    description {
      value
      links
      blocks
    }
    thumbnail {
      responsiveImage(imgixParams: { auto: format }) {
        ...Image
      }
    }
    lecturers {
      slug
      name
      avatar {
        responsiveImage(imgixParams: { w: 40, h: 40, auto: format }) {
          ...Image
        }
      }
    }
  }
`;

export const BlogFragment = gql`
  fragment Blog on BlogRecord {
    title
    slug
    createdAt
  }
`;

export const BlogContentFragment = gql`
  fragment BlogContent on BlogModelContentField {
    blocks
    inlineBlocks
    links
    value
  }
`;

export type DatoLecturer = EventFragmentType['lecturers'][number];
