import { cn } from '@/utils/cn';

export const IconButton = ({
  className,
  type = 'button',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      type={type}
      className={cn(
        [
          'flex size-20 items-center justify-center rounded-lg p-2 transition-[background-color,color]',
          'border-border bg-bg-raised focus-within:ring-2 focus-within:ring-fg-0 focus-within:ring-offset-1 focus-within:outline-none hover:bg-bg-1',
        ],
        className,
      )}
      {...props}
    />
  );
};
