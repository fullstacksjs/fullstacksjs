import { Button } from '@/components/Button';
import { ExternalLink } from '@/components/Link';

interface Props {
  children: React.ReactNode;
  url: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export function ResourceLink({ children, url, icon: Icon }: Props) {
  return (
    <Button variant="outline" size="xs" asChild>
      <ExternalLink
        className="gap-1.5 stroke-light-inactive text-light-1"
        href={url}
      >
        <Icon className="size-12 shrink-0 stroke-2" />
        {children}
      </ExternalLink>
    </Button>
  );
}
