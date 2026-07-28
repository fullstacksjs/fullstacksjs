import { Skeleton } from '@/components/Skeleton';

interface Props {
  command: string;
  title: string;
  description: React.ReactNode;
}

export function PageHeader({ command, title, description }: Props) {
  return (
    <header className="w-full pt-16 pb-18">
      <p className="mb-6 font-mono text-xs tracking-wide text-accent-0">
        {command}
      </p>
      <h1 className="mb-2 text-4xl/none font-bold tracking-tight desktop:text-5xl/none fa:text-3xl/snug">
        {title}
      </h1>
      <p className="max-w-[60ch] text-base/normal text-pretty text-fg-1">
        {description}
      </p>
    </header>
  );
}

export function PageHeaderSkeleton() {
  return (
    <header className="w-full pt-16 pb-18">
      <Skeleton height={20} width={100} />
      <Skeleton height={60} width={400} className="mt-6" />
      <Skeleton height={20} width={600} className="mt-6" />
      <Skeleton height={20} width={180} className="mt-6" />
    </header>
  );
}
