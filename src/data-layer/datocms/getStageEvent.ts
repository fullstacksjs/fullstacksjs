import 'server-only';
import { gql } from 'graphql-request';

import type { StageQuery } from './DatoCMS';
import type { EventLinks } from './EventLinks';
import type { StageEvent } from './Stage';

import { datoClient } from './datoClient';
import { ImagePatsFragment } from './Fragments';

const query = gql`
  ${ImagePatsFragment}
  query Stage {
    stage {
      thumbnail {
        responsiveImage {
          ...Image
        }
      }
      heading {
        blocks
      }
      description {
        blocks
        value
      }
      links {
        session
        calendar
      }
    }

    stage {
      heading {
        blocks
      }
      description {
        blocks
        value
      }
      links {
        session
        calendar
      }
    }
  }
`;

const toEventLinks = (
  link: NonNullable<StageQuery['stage']>['links'],
): EventLinks | undefined => {
  if (!link?.calendar || !link.session) return;

  return {
    session: link.session,
    calendar: link.calendar,
  };
};

export const getStageEvent = async (): Promise<StageEvent | undefined> => {
  const { stage } = await datoClient.request<StageQuery>(query);

  if (!stage) return;

  const links = toEventLinks(stage.links);

  if (
    !stage.thumbnail?.responsiveImage ||
    !stage.heading ||
    !stage.description ||
    !links
  ) {
    return;
  }

  return {
    description: stage.description,
    heading: stage.heading,
    thumbnail: stage.thumbnail.responsiveImage,
    links,
  };
};
