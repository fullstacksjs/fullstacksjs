import 'server-only';

import { gql, GraphQLClient } from 'graphql-request';
import { cache } from 'react';

import { config } from '@/config';

import type { AllEventsQuery } from '../__genearted__';

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

export interface FullstackEvent {
  slug: string;
  title: any;
  date: string;
  thumbnail: {
    src: string;
    alt: string;
  };
  subscribersCount?: number;
  presenter: {
    avatar: {
      src: string;
      alt: string;
    };
  };
}

const client = new GraphQLClient(config.dato.endpoint, {
  headers: { authorization: `Bearer ${config.dato.token}` },
});

const toFullstacksJSEvent = (ev: AllEventsQuery['allEvents'][number]) =>
  ({
    slug: ev.slug,
    title: ev.title,
    thumbnail: {
      alt: ev.thumbnail?.alt,
      src: ev.thumbnail?.url,
    },
    presenter: {
      avatar: {
        src: ev.lecturers[0]?.avatar?.[0]?.url,
        alt: ev.lecturers[0]?.avatar?.[0]?.alt,
      },
    },
    date: ev.startDate,
  } as FullstackEvent);

export const getEvents = cache(async (): Promise<FullstackEvent[]> => {
  console.log('GETTING EVENTS!');

  const data = await client.request<AllEventsQuery>(query);
  return data.allEvents.map(toFullstacksJSEvent);
});
