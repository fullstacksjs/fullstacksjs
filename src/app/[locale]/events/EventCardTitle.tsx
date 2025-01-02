import type { StructuredTextDocument } from 'react-datocms/structured-text';

import { Highlight } from '@/components/Highlight';
import { StructuredText } from 'react-datocms/structured-text';

interface Props {
  children: StructuredTextDocument;
}

export const EventCardTitle = ({ children: data }: Props) => (
  <div className="flex-1 text-md bidi-plain font-bold leading-tight">
    <StructuredText
      data={data}
      renderNode={(type, { key }, children) => {
        if (type === 'mark') return <Highlight key={key}>{children}</Highlight>;
        if (type === 'paragraph') return <span key={key}>{children}</span>;
        return children;
      }}
    />
  </div>
);
