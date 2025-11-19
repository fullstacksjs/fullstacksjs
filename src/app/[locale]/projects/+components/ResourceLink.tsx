import Link from 'next/link';

interface ResourceLinkProps {
  children: React.ReactNode;
  url: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export function ResourceLink({ children, url, icon: Icon }: ResourceLinkProps) {
  return (
    <Link
      className="font-rajdhani font-semibold py-1 flex gap-1.5 items-center text-light-inactive stroke-light-inactive hover:text-light-1 hover:stroke-light-1 transition-all"
      href={url}
      target="_blank"
    >
      <Icon className="size-12 shrink-0 stroke-2" />
      {children}
    </Link>
  );
}
