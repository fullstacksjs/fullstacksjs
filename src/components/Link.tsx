import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/utils/cn';

type Props = React.JSX.IntrinsicElements['a'] & {
  asChild?: boolean;
};

export const Anchor = ({ className, asChild, ...props }: Props) => {
  const Comp = asChild ? Slot : 'a';
  return (
    <Comp className={cn('text-accent-0 underline', className)} {...props} />
  );
};

export const ExternalLink = (props: React.ComponentProps<'a'>) => {
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  return <a rel="noopener noreferrer" target="_blank" {...props} />;
};
