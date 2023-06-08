import Image from 'next/image';
import { useTranslations } from 'next-intl';

import type { FullstackEvent } from '@/data-layer/operations/getEvents';

interface Props {
  event: FullstackEvent;
}

export default function EventCard({ event }: Props): React.JSX.Element {
  const t = useTranslations();
  // const eventType = new Date(event.date) > new Date() ? 'upcoming' : 'archived';

  return (
    <div className="dotted-border flex flex-col p-[1px]">
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
          <p className="text-xsm text-accent-0">{event.date}</p>
        </div>
        <div className="mt-auto">
          <div className="flex items-center justify-between">
            <Image
              className="rounded-full"
              src={event.presenter.avatar.src}
              alt={event.presenter.avatar.alt}
              width={24}
              height={24}
            />
            <span className="text-xsm text-accent-0">
              {`${event.subscribersCount ?? 0} ${t(
                'upcomingEvents.actionCountModifier',
              )}`}
            </span>
          </div>
          {/* <EventActionsBtn eventType={eventType} /> */}
        </div>
      </div>
    </div>
  );
}
