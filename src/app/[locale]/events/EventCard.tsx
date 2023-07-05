/* eslint-disable jsx-a11y/alt-text */
import { useTranslations } from 'next-intl';
import { Image } from 'react-datocms/image';
import { renderNodeRule, StructuredText } from 'react-datocms/structured-text';

import { Highlight } from '@/components/Highlight';
import type { FullstacksJSEvent } from '@/data-layer/domain';

interface Props {
  event: FullstacksJSEvent;
}

export default function EventCard({ event }: Props): React.JSX.Element {
  const t = useTranslations();
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
          />
          <p className="text-xsm text-accent-0">
            {event.date.toLocaleDateString('en-UK')}
          </p>
        </div>
        <div className="mt-auto">
          <div className="flex items-center justify-between">
            <Image className="rounded-full" data={lecturers.avatar} />
            {event.isUpcoming ? (
              <span className="text-xsm text-accent-0">
                {t('events.subscribers', { count: 0 })}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
