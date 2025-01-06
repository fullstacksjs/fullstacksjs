import type { StructuredTextDocument } from 'react-datocms';

import { Highlight } from '@/components/Highlight';
import { Anchor } from '@/components/Link';
import { cn } from '@/utils/cn';
import { StructuredText } from 'react-datocms';

interface Props {
  data: StructuredTextDocument;
  className?: string;
}

export function EventCardDescription({ data, className }: Props) {
  return (
    <div className={cn('flex flex-col gap-2 leading-tight', className)}>
      <StructuredText
        data={data}
        renderNode={(type, props, children) => {
          const key = props.key;
          if (type === 'p')
            return (
              <p className="mb-2 text-fg-1" key={key}>
                {children}
              </p>
            );
          if (type === 'h3')
            return (
              <h3 className="mb-4 mt-10 font-bold" key={key}>
                {children}
              </h3>
            );
          if (type === 'strong') return <strong key={key}>{children}</strong>;
          if (type === 'a')
            return (
              <Anchor href={props.href} key={key} target={props.target}>
                {children}
              </Anchor>
            );
          if (type === 'br') return <br key={key} />;
          if (type === 'mark')
            return <Highlight key={key}>{children}</Highlight>;
          return children;
        }}
      />
    </div>
  );
}
