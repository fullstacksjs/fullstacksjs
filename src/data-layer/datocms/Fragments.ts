import { gql } from 'graphql-request';

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
