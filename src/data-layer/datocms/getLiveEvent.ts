import 'server-only';
import type { ResponsiveImageType } from 'react-datocms';

import { gql } from 'graphql-request';

import type { MobReviewQuery, StageQuery, WhatsupQuery } from './DatoCMS';
import type { EventLinks } from './EventLinks';

import { datoClient } from './datoClient';
import { ImageFragment } from './Fragments';

export type LiveEventKind = 'mob' | 'stage' | 'wus';

export interface LiveEvent {
  thumbnail: ResponsiveImageType;
  heading: any;
  description: any;
  links: EventLinks;
}

interface RawLiveEventRecord {
  thumbnail?: { responsiveImage?: ResponsiveImageType | null } | null;
  heading?: unknown;
  description?: unknown;
  links?: { session?: string | null; calendar?: string | null } | null;
}

const mobQuery = gql`
  ${ImageFragment}
  query MobReview {
    mobreview {
      thumbnail {
        responsiveImage {
          ...Image
        }
      }
      heading {
        value
        links
        blocks
      }
      description {
        value
        links
        blocks
      }
      links {
        session
        calendar
      }
    }
  }
`;

const stageQuery = gql`
  ${ImageFragment}
  query Stage {
    stage {
      thumbnail {
        responsiveImage {
          ...Image
        }
      }
      heading {
        value
        links
        blocks
      }
      description {
        value
        links
        blocks
      }
      links {
        session
        calendar
      }
    }
  }
`;

const wusQuery = gql`
  ${ImageFragment}
  query Whatsup {
    whatsup {
      thumbnail {
        responsiveImage {
          ...Image
        }
      }
      heading {
        value
        links
        blocks
      }
      description {
        value
        links
        blocks
      }
      links {
        session
        calendar
      }
    }
  }
`;

const fetchers: Record<
  LiveEventKind,
  () => Promise<RawLiveEventRecord | null | undefined>
> = {
  mob: async () => {
    const res = await datoClient.request<MobReviewQuery>(mobQuery);
    return res.mobreview;
  },
  stage: async () => {
    const res = await datoClient.request<StageQuery>(stageQuery);
    return res.stage;
  },
  wus: async () => {
    const res = await datoClient.request<WhatsupQuery>(wusQuery);
    return res.whatsup;
  },
};

const toEventLinks = (
  link: RawLiveEventRecord['links'],
): EventLinks | undefined => {
  if (!link?.calendar || !link.session) return;

  return {
    session: link.session,
    calendar: link.calendar,
  };
};

export const getLiveEvent = async (
  kind: LiveEventKind,
): Promise<LiveEvent | undefined> => {
  const record = await fetchers[kind]();

  if (!record) return;

  const links = toEventLinks(record.links);

  if (
    !record.thumbnail?.responsiveImage ||
    !record.heading ||
    !record.description ||
    !links
  ) {
    return;
  }

  return {
    description: record.description,
    heading: record.heading,
    thumbnail: record.thumbnail.responsiveImage,
    links,
  };
};
