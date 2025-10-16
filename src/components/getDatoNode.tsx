import { isObject } from '@fullstacksjs/toolbox';

import { Highlight } from './Highlight';
import { Anchor } from './Link';
import { Separator } from './Separator';

type Node =
  | {
      type: 'a';
      props: { key: string; href: string; target: string };
      children: string;
    }
  | { type: 'code'; props: null; children: string }
  | {
      type:
        | 'br'
        | 'h1'
        | 'h2'
        | 'h3'
        | 'hr'
        | 'li'
        | 'mark'
        | 'p'
        | 'strong'
        | 'ul';
      props: { key: string };
      children: string;
    };

export const getDatoNode = ({ type, props, children }: Node) => {
  const key = isObject(props) && 'key' in props ? props.key : undefined;

  if (type === 'h1')
    return (
      <h1 className="text-xl font-bold" key={key}>
        {children}
      </h1>
    );
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
  if (type === 'ul')
    return (
      <ul className="mb-2 list-disc list-item-star list-inside" key={key}>
        {children}
      </ul>
    );
  if (type === 'li')
    return (
      <li className="mt-4 *:inline" key={key}>
        {children}
      </li>
    );
  if (type === 'h2')
    return (
      <h2 className="mb-4 mt-10 text-xl font-bold" key={key}>
        {children}
      </h2>
    );
  if (type === 'strong')
    return (
      <strong className="text-fg-0" key={key}>
        {children}
      </strong>
    );
  if (type === 'hr') return <Separator className="my-8" key={key} />;
  if (type === 'a')
    return (
      <Anchor href={props.href} key={key} target={props.target}>
        {children}
      </Anchor>
    );
  if (type === 'br') return <br key={key} />;
  if (type === 'mark') return <Highlight key={key}>{children}</Highlight>;

  return children;
};
