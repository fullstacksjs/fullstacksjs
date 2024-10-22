import { cn } from '@/utils/cn';

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const Skeleton = ({ className, ...props }: Props) => {
  return (
    <div
      className={cn(
        'absolute inset-y-0 animate-pulse rounded-lg bg-white opacity-5',
        className,
      )}
      {...props}
    />
  );
};
