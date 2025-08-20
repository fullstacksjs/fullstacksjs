import type { StructuredTextDocument } from 'react-datocms/structured-text';

import { StructuredText } from 'react-datocms/structured-text';

import { getDatoNode } from '@/components/getDatoNode';
import { cn } from '@/utils/cn';

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
      renderNode={(type, props, children) => {
        if (type === 'p') return children;
        return getDatoNode(type, props, children);
      }}
    />
  </div>
);
