import { SecondaryButton } from '@/components/SecondaryButton';

export function AuthBtnSkeleton() {
  return (
    <SecondaryButton className="relative overflow-hidden p-4">
      <div className="size-10 tablet:size-14 rounded-full animate-pulse bg-bg-muted" />
      <div className="me-2 hidden h-5 w-48 animate-pulse rounded-lg bg-bg-muted tablet:block" />
    </SecondaryButton>
  );
}
