import { EventListSkeleton } from './+components/EventList';

// ISSUE: This is a workaround for Next.JS + next-intl integration [https://github.com/amannn/next-intl/issues/1493]
export default function Loading() {
  return <EventListSkeleton />;
}
