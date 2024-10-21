import { cn } from '@/utils/cn';

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const Skeleton = ({ className, ...props }: Props) => {
  return (
    <div
      className={cn(
        'absolute inset-y-0 bg-opacity-5 bg-white animate-pulse rounded-lg',
        className,
      )}
      {...props}
    />
  );
};
