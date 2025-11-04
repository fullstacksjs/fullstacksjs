import type { StructuredTextDocument } from 'react-datocms';

import { StructuredText } from 'react-datocms';

import { getDatoNode } from '@/components/getDatoNode';
import { cn } from '@/utils/cn';

interface Props {
  data: StructuredTextDocument;
  className?: string;
}

export function EventCardDescription({ data, className }: Props) {
  return (
    <div className={cn('flex flex-col gap-2 leading-tight', className)}>
      <StructuredText data={data} renderNode={getDatoNode} />
    </div>
  );
}
