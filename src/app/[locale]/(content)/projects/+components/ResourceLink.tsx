import Link from 'next/link';

interface ResourceLinkProps {
  children: React.ReactNode;
  url: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export function ResourceLink({ children, url, icon: Icon }: ResourceLinkProps) {
  return (
    <Link
      className="flex items-center gap-1.5 stroke-light-inactive py-1 font-rajdhani font-semibold text-light-inactive transition-all hover:stroke-light-1 hover:text-light-1"
      href={url}
      target="_blank"
    >
      <Icon className="size-12 shrink-0 stroke-2" />
      {children}
    </Link>
  );
}
