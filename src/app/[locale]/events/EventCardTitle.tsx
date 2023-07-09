import type { StructuredTextDocument } from 'react-datocms/structured-text';
import { renderNodeRule, StructuredText } from 'react-datocms/structured-text';

import { Highlight } from '@/components/Highlight';

interface Props {
  children: StructuredTextDocument;
}

export const EventCardTitle = ({ children: data }: Props) => (
  <StructuredText
    data={data}
    customNodeRules={[
      renderNodeRule(
        (node): node is any =>
          'marks' in node && !!node.marks?.includes('highlight'),
        ({ node, key }) => {
          return <Highlight key={key}>{node.value}</Highlight>;
        },
      ),
      renderNodeRule(
        (node): node is any => node.type === 'paragraph',
        ({ key, children }) => {
          return (
            <span className="bidi-plain" key={key}>
              {children}
            </span>
          );
        },
      ),
    ]}
  />
);
