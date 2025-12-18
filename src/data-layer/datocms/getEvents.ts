import 'server-only';
import { isPast } from 'date-fns';
import { gql } from 'graphql-request';
import { cacheTag } from 'next/cache';

import { cacheTags } from '@/config/cacheTags';

import type {
  AllEventsQuery,
  EventFragment as EventFragmentType,
} from './DatoCMS';
import type { Events, FullstacksJSEvent, Lecturer } from './Event';
import type { DatoLecturer } from './Fragments';

import { datoClient } from './datoClient';
import { EventFragment } from './Fragments';

const query = gql`
  ${EventFragment}

  query AllEvents {
    allEvents(orderBy: startDate_DESC, first: 100) {
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
    title: ev.title,
    thumbnail: ev.thumbnail!.responsiveImage!,
    lecturers: ev.lecturers.map(toLecturer),
    description: ev.description,
    date,
    isUpcoming: !isPast(date),
    mediaUrl: ev.mediaUrl ?? undefined,
  };
};

export const getEvents = async (): Promise<Events> => {
  'use cache';

  cacheTag(cacheTags.events());

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
