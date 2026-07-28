import { cn } from '@/utils/cn';

type Variant = 'right' | 'wrong';

interface Props {
  variant: Variant;
  children: React.ReactNode;
}

const variants: Record<
  Variant,
  { className: string; sign: string; signClassName: string }
> = {
  wrong: {
    className: 'bg-fg-error/10',
    sign: '—',
    signClassName: 'text-fg-error',
  },
  right: {
    className: 'bg-fg-success/10 text-fg-0',
    sign: '+',
    signClassName: 'text-fg-success',
  },
};

export const Example = ({ variant, children }: Props) => {
  const { className, sign, signClassName } = variants[variant];

  return (
    <div
      className={cn(
        'flex items-baseline gap-3.5 rounded-lg p-4 text-sm/snug',
        className,
      )}
    >
      <span className={cn('shrink-0 font-mono', signClassName)} dir="ltr">
        {sign}
      </span>
      <span>{children}</span>
    </div>
  );
};
