import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  asChild?: boolean;
}

function SecondaryButton({ className, asChild, ...props }: Props) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      type="button"
      className={clsx(
        `flex h-[42px] items-center gap-6 rounded-xl bg-bg-muted px-4 text-xsm font-semibold capitalize leading-tight text-fg-0 hover:cursor-pointer focus:outline tablet:h-[53px]`,
        className,
      )}
      {...props}
    />
  );
}

export default SecondaryButton;
