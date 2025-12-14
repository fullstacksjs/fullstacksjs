import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/utils/cn';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  asChild?: boolean;
}

export function SecondaryButton({ className, asChild, ...props }: Props) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      type="button"
      className={cn(
        `flex h-20 items-center gap-6 rounded-xl bg-bg-muted px-4 text-xs font-semibold capitalize leading-tight text-fg-0 hover:cursor-pointer focus:outline disabled:cursor-auto`,
        className,
      )}
      {...props}
    />
  );
}
