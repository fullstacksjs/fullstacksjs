import { cn } from '@/utils/cn';
import { Slot } from '@radix-ui/react-slot';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
}: Props) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      className={cn(
        'flex flex-row items-center justify-center rounded-lg px-12 py-4 text-sm font-semibold leading-snug disabled:border-none disabled:bg-bg-muted disabled:text-fg-muted',
        {
          'border border-accent-0 text-accent-0 transition-[background-color,color] hover:bg-accent-0 hover:text-bg-0 focus:text-bg-0 focus:bg-accent-0 focus:outline-none':
            variant === 'outline',
          'bg-accent-0 text-dark-0 transition-shadow': variant === 'contained',
          'px-6 py-3': size === 'sm',
          'px-12 py-4': size === 'md',
        },
        className,
      )}
      {...props}
    />
  );
};
