import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'contained' | 'outline';
  size?: 'md' | 'sm';
  asChild?: boolean;
}

export const Button = ({
  variant = 'contained',
  className,
  asChild,
  size = 'md',
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      className={cn(
        'flex flex-row items-center justify-center rounded-lg px-12 py-4 text-md font-semibold hover:cursor-pointer disabled:cursor-auto disabled:border-none disabled:bg-bg-muted disabled:text-fg-muted',
        {
          'border border-border transition-[background-color,color] bg-bg-raised hover:bg-bg-1 focus:outline-border':
            variant === 'outline',
          'bg-accent-0 text-fg-on-primary': variant === 'contained',
          'px-6 py-3': size === 'sm',
          'px-12 py-3': size === 'md',
        },
        className,
      )}
      {...props}
    />
  );
};
