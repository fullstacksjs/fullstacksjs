import { SecondaryButton } from '@/components/SecondaryButton';
import { Skeleton } from '@/components/Skeleton';

export function AuthBtnSkeleton() {
  return (
    <SecondaryButton className="relative overflow-hidden p-4">
      <Skeleton />
      <div className="size-14 rounded-full bg-fg-muted" />
      <div className="me-2 hidden h-5 w-48 rounded-lg bg-bg-muted tablet:block" />
    </SecondaryButton>
  );
}
