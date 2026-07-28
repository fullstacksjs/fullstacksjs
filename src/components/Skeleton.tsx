import { cn } from '@/utils/cn';
import { useMemo } from 'react';

interface Props extends React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> {
  width?: number | string;
  height?: number | string;
  rounded?: boolean;
  circle?: boolean;
}

export const Skeleton = ({
  className,
  width,
  height,
  style,
  circle,
  rounded,
  ...props
}: Props) => {
  const memoizedStyle = useMemo(() => {
    return { ...style, width, height };
  }, [style, width, height]);

  return (
    <div
      style={memoizedStyle}
      className={cn(
        'inset-y-0 animate-pulse rounded-lg bg-bg-muted opacity-5',
        { 'rounded-md': rounded },
        { 'rounded-full aspect-square': circle },
        className,
      )}
      {...props}
    />
  );
};
