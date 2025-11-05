import { cn } from '@/utils/cn';

interface Props
  extends React.DetailedHTMLProps<
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
  ...props
}: Props) => {
  return (
    <div
      style={{ ...style, width, height }}
      className={cn(
        'inset-y-0 animate-pulse rounded-lg bg-bg-muted opacity-5',
        { 'rounded-md': props.rounded },
        { 'rounded-full aspect-square': circle },
        className,
      )}
      {...props}
    />
  );
};
