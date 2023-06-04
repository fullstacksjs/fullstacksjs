import clsx from 'clsx';

interface Props {
  href: string;
  children: React.ReactNode;
}

export default function Nav({ href, children }: Props) {
  const isCurrentPath = false;
  // removeTrailingSlashes(removeLeadingSlashes(href.trim())) ===
  // removeTrailingSlashes(removeLeadingSlashes(pathname.trim()));
  // TODO: Make it real
  const isRtl = true;

  const ariaProps: React.HTMLAttributes<HTMLLIElement> = isCurrentPath
    ? { 'aria-current': 'page' }
    : {};

  return (
    <li
      {...ariaProps}
      className={clsx(
        'relative scroll-m-9 list-none uppercase transition-colors',
        {
          'after:w-8 text-fg-0': isCurrentPath,
          'hover:after:w-8 text-light-muted hover:text-fg-1': !isCurrentPath,
          'after:left-0': !isRtl,
          'after:right-0': isRtl,
        },
      )}
    >
      <a
        href={href}
        className={
          'rounded-sm text-base focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-8 focus-visible:outline-accent-0 tablet:text-md'
        }
      >
        {children}
      </a>
    </li>
  );
}
