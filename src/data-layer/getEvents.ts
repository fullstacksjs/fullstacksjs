import { gql } from 'graphql-request';
import type { ResponsiveImageType } from 'react-datocms/image';

import type { AllEventsQuery, ImagePartsFragment } from './__generated__';
import { datoClient } from './client';
import type { FullstacksJSEvent, Lecturer } from './domain';

const query = gql`
  fragment ImageParts on ResponsiveImage {
    # always required
    src
    width
    height

    # not required, but strongly suggested!
    alt
    title

    # blur-up placeholder, JPEG format, base64-encoded, or...
    base64
    # background color placeholder
    bgColor

    sizes
  }
  query AllEvents {
    allEvents {
      slug
      startDate
      title {
        blocks
        links
        value
      }
      thumbnail {
        responsiveImage {
          ...ImageParts
        }
      }
      lecturers {
        slug
        name
        avatar {
          responsiveImage(imgixParams: { w: 32, h: 32, auto: format }) {
            ...ImageParts
          }
        }
      }
    }
  }
`;

const toMedia = (media: ImagePartsFragment): ResponsiveImageType => {
  return {
    ...media,
    width: media.width,
  };
};

const toLecturer = (
  l: AllEventsQuery['allEvents'][number]['lecturers'][number],
): Lecturer => ({
  name: l.name!,
  avatar: toMedia(l.avatar!.responsiveImage!),
});

const toFullstacksJSEvent = (
  ev: AllEventsQuery['allEvents'][number],
): FullstacksJSEvent => {
  return {
    slug: ev.slug!,
    title: ev.title,
    thumbnail: toMedia(ev.thumbnail!.responsiveImage!),
    lecturers: ev.lecturers.map(toLecturer),
    date: new Date(ev.startDate),
  };
};

export const getEvents = async (): Promise<FullstacksJSEvent[]> => {
  const data = await datoClient.request<AllEventsQuery>(query);
  return data.allEvents.map(toFullstacksJSEvent);
};
