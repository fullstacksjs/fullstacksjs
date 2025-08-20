import 'server-only';
import { gql } from 'graphql-request';

import type { MobReviewQuery } from './DatoCMS';
import type { EventLinks } from './EventLinks';
import type { MobReviewEvent } from './MobReview';

import { datoClient } from './datoClient';
import { ImageFragment } from './Fragments';

const query = gql`
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

const toEventLinks = (
  link: NonNullable<MobReviewQuery['mobreview']>['links'],
): EventLinks | undefined => {
  if (!link?.calendar || !link.session) return;

  return {
    session: link.session,
    calendar: link.calendar,
  };
};

export const getMobEvent = async (): Promise<MobReviewEvent | undefined> => {
  const { mobreview } = await datoClient.request<MobReviewQuery>(query);

  if (!mobreview) return;

  const links = toEventLinks(mobreview.links);

  if (
    !mobreview.thumbnail?.responsiveImage ||
    !mobreview.heading ||
    !mobreview.description ||
    !links
  ) {
    return;
  }

  return {
    description: mobreview.description,
    heading: mobreview.heading,
    thumbnail: mobreview.thumbnail.responsiveImage,
    links,
  };
};
