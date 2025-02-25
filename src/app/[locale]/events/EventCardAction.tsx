import { Button } from '@/components/Button';

interface Props {
  isUpcoming: boolean;
  mediaUrl?: string;
}

export function EventCardAction({ isUpcoming, mediaUrl }: Props) {
  if (!isUpcoming)
    return (
      <Button asChild>
        <a href={mediaUrl} target="_blank">
          مشاهده
        </a>
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
