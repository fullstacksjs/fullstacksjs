import { Button } from '@/components/Button';
import { ExternalLink } from '@/components/Link';

interface Props {
  isUpcoming: boolean;
  mediaUrl?: string;
}

export function EventCardAction({ isUpcoming, mediaUrl }: Props) {
  if (!isUpcoming)
    return (
      <Button asChild>
        <ExternalLink href={mediaUrl}>مشاهده</ExternalLink>
      </Button>
    );

  return (
    <div className="flex gap-4">
      <Button asChild>
        <a href="/mob/calendar" target="_blank">
          افزودن به تقویم
        </a>
      </Button>
      <Button asChild variant="outline">
        <a href="/mob/live" target="_blank">
          وارد جلسه شوید
        </a>
      </Button>
    </div>
  );
}
