import { cn } from '@/utils/cn';

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLLIElement>,
  HTMLLIElement
>;

export const ListItem = ({ className, ...props }: Props) => {
  return (
    <li
      className={cn(
        'mb-3 ms-6 scroll-m-10 list-decimal leading-tight transition-all motion-reduce:transition-none',
        className,
      )}
      {...props}
    />
  );
};
