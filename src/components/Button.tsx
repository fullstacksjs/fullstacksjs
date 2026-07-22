import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'contained' | 'outline';
  size?: 'md' | 'sm' | 'xs';
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
        'flex flex-row items-center justify-center rounded-lg px-12 font-semibold hover:cursor-pointer disabled:cursor-auto disabled:border-none disabled:bg-bg-muted disabled:text-fg-muted',
        {
          'border border-border transition-[background-color,color] bg-bg-raised hover:bg-bg-1 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-1 focus-within:ring-fg-0 ring-offset-bg-0':
            variant === 'outline',
          'bg-accent-0 text-fg-on-primary': variant === 'contained',
          'px-6 h-20 text-sm': size === 'sm',
          'px-12 h-24 text-md': size === 'md',
          'px-2 h-14 text-sm': size === 'xs',
        },
        className,
      )}
      {...props}
    />
  );
};
