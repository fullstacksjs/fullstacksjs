import { gql } from 'graphql-request';

import type { AllEventsQuery } from './__generated__';
import { datoClient } from './client';
import type { FullstacksJSEvent, Lecturer } from './domain';

const query = gql`
  query AllEvents {
    allEvents {
      slug
      title {
        blocks
        links
        value
      }
      thumbnail {
        url
        alt
        size
        width
        height
      }
      startDate
      lecturers {
        slug
        name
        avatar {
          url
          alt
          size
          width
          height
        }
      }
    }
  }
`;

const toLecturer = (
  l: AllEventsQuery['allEvents'][number]['lecturers'][number],
): Lecturer => ({
  name: l.name!,
  avatar: {
    src: l.avatar!.url,
    alt: l.avatar!.alt ?? `${l.name!}'s avatar`,
  },
});

const toFullstacksJSEvent = (
  ev: AllEventsQuery['allEvents'][number],
): FullstacksJSEvent => {
  return {
    slug: ev.slug!,
    title: ev.title,
    thumbnail: {
      alt: ev.thumbnail!.alt ?? `${ev.slug!}'s thumbnail`,
      src: ev.thumbnail!.url,
    },
    lecturers: ev.lecturers.map(toLecturer),
    date: new Date(ev.startDate),
  };
};

export const getEvents = async (): Promise<FullstacksJSEvent[]> => {
  const data = await datoClient.request<AllEventsQuery>(query);
  return data.allEvents.map(toFullstacksJSEvent);
};
