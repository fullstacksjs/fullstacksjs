import { t } from 'i18next';
import { Image } from 'react-datocms/image';
import { renderNodeRule, StructuredText } from 'react-datocms/structured-text';

import type { FullstacksJSEvent } from '../data-layer/domain';
import Highlight from './Highlight.astro';

interface Props {
  event: FullstacksJSEvent;
}

export const EventCard = ({ event }: Props): React.JSX.Element => {
  const lecturers = event.lecturers[0]!;

  return (
    <div className="flex flex-col rounded-md border border-dashed border-fg-muted p-[1px]">
      <Image
        className="aspect-video w-full flex-none rounded-t-[4px]"
        data={event.thumbnail}
      />
      <div className="grid flex-1 p-8">
        <div className="py-8">
          <StructuredText
            data={event.title}
            customNodeRules={[
              renderNodeRule(
                (node): node is any =>
                  'marks' in node && !!node.marks?.includes('highlight'),
                ({ node, key }) => {
                  return <Highlight key={key}>{node.value}</Highlight>;
                },
              ),
            ]}
          ></StructuredText>
          <p className="text-xsm text-accent-0">
            {event.date.toLocaleDateString('en-UK')}
          </p>
        </div>
        <div className="mt-auto">
          <div className="flex items-center justify-between">
            <Image className="rounded-full" data={lecturers.avatar} />
            <span className="text-xsm text-accent-0">
              {`0 ${t('events.subscribers')}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
