import { cn } from '@/utils/cn';

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const Skeleton = ({ className, ...props }: Props) => {
  return (
    <div
      className={cn(
        'inset-y-0 animate-pulse rounded-lg bg-bg-muted opacity-5',
        className,
      )}
      {...props}
    />
  );
};
