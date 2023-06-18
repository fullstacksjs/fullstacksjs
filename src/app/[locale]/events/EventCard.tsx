import Image from 'next/image';
import { useTranslations } from 'next-intl';

import type { FullstackEvent } from '@/data-layer/domain';

interface Props {
  event: FullstackEvent;
}

export default function EventCard({ event }: Props): React.JSX.Element {
  const t = useTranslations('events');
  const lecturers = event.lecturers[0]!;

  return (
    <div className="flex flex-col rounded-md border border-dashed border-fg-muted p-[1px]">
      <Image
        className="h-auto w-full flex-none rounded-t-[4px]"
        src={event.thumbnail.src}
        alt={event.thumbnail.alt}
        width={300}
        height={300}
      />
      <div className="grid flex-1 p-8">
        <div className="py-8">
          <h4 className="text-md font-bold uppercase leading-none">
            {event.title.value.document.children[0].children[0].value}
          </h4>
          <p className="text-xsm text-accent-0">
            {event.date.toLocaleDateString('en-UK')}
          </p>
        </div>
        <div className="mt-auto">
          <div className="flex items-center justify-between">
            <Image
              className="rounded-full"
              src={lecturers.avatar.src}
              alt={lecturers.avatar.alt}
              width={24}
              height={24}
            />
            <span className="text-xsm text-accent-0">
              {`${event.subscribersCount ?? 0} ${t('subscribers')}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
