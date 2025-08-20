import 'server-only';
import { gql } from 'graphql-request';

import type { WhatsupQuery } from './DatoCMS';
import type { EventLinks } from './EventLinks';
import type { WhatsUpEvent } from './WhatsUp';

import { datoClient } from './datoClient';
import { ImageFragment } from './Fragments';

const query = gql`
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

const toEventLinks = (
  link: NonNullable<WhatsupQuery['whatsup']>['links'],
): EventLinks | undefined => {
  if (!link?.calendar || !link.session) return;

  return {
    session: link.session,
    calendar: link.calendar,
  };
};

export const getWusEvent = async (): Promise<WhatsUpEvent | undefined> => {
  const { whatsup } = await datoClient.request<WhatsupQuery>(query);

  if (!whatsup) return;

  const links = toEventLinks(whatsup.links);

  if (
    !whatsup.thumbnail?.responsiveImage ||
    !whatsup.heading ||
    !whatsup.description ||
    !links
  ) {
    return;
  }

  return {
    description: whatsup.description,
    heading: whatsup.heading,
    thumbnail: whatsup.thumbnail.responsiveImage,
    links,
  };
};
