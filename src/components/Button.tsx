import { cn } from '@/utils/cn';
import { Slot } from '@radix-ui/react-slot';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
        'flex flex-row items-center justify-center rounded-lg px-12 py-4 text-sm font-semibold leading-snug hover:cursor-pointer disabled:border-none disabled:bg-bg-muted disabled:text-fg-muted disabled:cursor-auto',
        {
          'border border-accent-0 text-accent-0 transition-[background-color,color] hover:bg-accent-0 hover:text-bg-0 focus:text-bg-0 focus:bg-accent-0 focus:outline-hidden':
            variant === 'outline',
          'bg-accent-0 text-dark-0': variant === 'contained',
          'px-6 py-3': size === 'sm',
          'px-12 py-4': size === 'md',
        },
        className,
      )}
      {...props}
    />
  );
};
