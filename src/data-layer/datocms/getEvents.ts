import 'server-only';

import type { ResponsiveImageType } from 'react-datocms/image';

import { isPast } from 'date-fns';
import { gql } from 'graphql-request';

import type { AllEventsQuery, ImagePartsFragment } from './DatoCMS';
import type { Events, FullstacksJSEvent, Lecturer } from './Event';

import { datoClient } from './datoClient';

const query = gql`
  fragment ImageParts on ResponsiveImage {
    src
    width
    height
    alt
    title
    base64
    bgColor
    sizes
  }
  query AllEvents {
    allEvents(orderBy: startDate_DESC, first: 100) {
      slug
      startDate
      mediaUrl
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
          responsiveImage(imgixParams: { w: 40, h: 40, auto: format }) {
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
  const date = new Date(ev.startDate);

  return {
    slug: ev.slug!,
    title: ev.title,
    thumbnail: toMedia(ev.thumbnail!.responsiveImage!),
    lecturers: ev.lecturers.map(toLecturer),
    date,
    isUpcoming: !isPast(date),
    mediaUrl: ev.mediaUrl ?? undefined,
  };
};

export const getEvents = async (): Promise<Events> => {
  const data = await datoClient.request<AllEventsQuery>(query);
  return data.allEvents.map(toFullstacksJSEvent).reduce<Events>(
    (evs, ev) => {
      if (ev.isUpcoming) evs.upcoming.push(ev);
      else evs.archived.push(ev);
      return evs;
    },
    { upcoming: [], archived: [] },
  );
};
