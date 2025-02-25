import type { StructuredTextDocument } from 'react-datocms/structured-text';

import { Highlight } from '@/components/Highlight';
import { cn } from '@/utils/cn';
import { StructuredText } from 'react-datocms/structured-text';

interface Props {
  data: StructuredTextDocument;
  className?: string;
}

export const EventCardTitle = ({ data, className }: Props) => (
  <div
    className={cn(
      'flex-1 text-md bidi-plain font-bold leading-tight',
      className,
    )}
  >
    <StructuredText
      data={data}
      renderNode={(type, { key }, children) => {
        if (type === 'mark') return <Highlight key={key}>{children}</Highlight>;
        return children;
      }}
    />
  </div>
);
