import { gql } from 'graphql-request';

import type { EventFragment as EventFragmentType } from './DatoCMS';

export const ImagePatsFragment = gql`
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
  ${ImagePatsFragment}

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
      responsiveImage {
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

export type DatoLecturer = EventFragmentType['lecturers'][number];
