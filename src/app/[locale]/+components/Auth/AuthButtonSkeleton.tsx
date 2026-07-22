import { Button } from '@/components/Button';

export function AuthBtnSkeleton() {
  return (
    <Button variant="outline" size="sm" className="gap-4">
      <div className="size-12 animate-pulse rounded-full bg-bg-muted tablet:size-12" />
      <div className="hidden h-5 w-48 animate-pulse rounded-lg bg-bg-muted tablet:block" />
    </Button>
  );
}
