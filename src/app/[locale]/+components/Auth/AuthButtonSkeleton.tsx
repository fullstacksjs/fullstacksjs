import { SecondaryButton } from '@/components/SecondaryButton';

export function AuthBtnSkeleton() {
  return (
    <SecondaryButton className="relative overflow-hidden p-4">
      <div className="size-10 animate-pulse rounded-full bg-bg-muted tablet:size-14" />
      <div className="me-2 hidden h-5 w-48 animate-pulse rounded-lg bg-bg-muted tablet:block" />
    </SecondaryButton>
  );
}
