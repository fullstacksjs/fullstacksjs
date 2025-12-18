import 'server-only';
import { isPast } from 'date-fns';
import { gql } from 'graphql-request';
import { cacheLife } from 'next/cache';

import type {
  EventFragment as EventFragmentType,
  EventQuery,
  EventQueryVariables,
} from './DatoCMS';
import type { FullstacksJSEvent, Lecturer } from './Event';
import type { DatoLecturer } from './Fragments';

import { datoClient } from './datoClient';
import { EventFragment } from './Fragments';

const query = gql`
  ${EventFragment}

  query Event($slug: String!) {
    event(filter: { slug: { eq: $slug } }) {
      ...Event
    }
  }
`;

const toLecturer = (l: DatoLecturer): Lecturer => ({
  name: l.name!,
  avatar: l.avatar!.responsiveImage!,
});

const toFullstacksJSEvent = (ev: EventFragmentType): FullstacksJSEvent => {
  const date = new Date(ev.startDate);

  return {
    slug: ev.slug!,
    title: ev.title!,
    description: ev.description!,
    thumbnail: ev.thumbnail!.responsiveImage!,
    lecturers: ev.lecturers.map(toLecturer),
    date,
    isUpcoming: !isPast(date),
    mediaUrl: ev.mediaUrl ?? undefined,
  };
};

export const getEventBySlug = async (
  slug: string,
): Promise<FullstacksJSEvent | undefined> => {
  'use cache';

  cacheLife('days');

  const data = await datoClient.request<EventQuery, EventQueryVariables>(
    query,
    { slug },
  );

  if (!data.event) return;

  return toFullstacksJSEvent(data.event);
};
