import 'server-only';
import { gql } from 'graphql-request';

import type { WusLinksQuery } from './DatoCMS';
import type { EventLinks } from './EventLinks';

import { datoClient } from './datoClient';

const query = gql`
  query WusLinks {
    link {
      wusSession
      wusCalendar
    }
  }
`;

const toEventLinks = (link: WusLinksQuery['link']): EventLinks | undefined => {
  if (!link?.wusCalendar || !link.wusSession) {
    return;
  }
  return {
    session: link.wusSession,
    calendar: link.wusCalendar,
  };
};

export const getWusLinks = async (): Promise<EventLinks | undefined> => {
  const data = await datoClient.request<WusLinksQuery>(query);
  return toEventLinks(data.link);
};
