import { Highlight } from './Highlight';
import { Anchor } from './Link';

export const getDatoNode = (type: string, props: any, children: any) => {
  const key = props.key;

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
  if (type === 'strong') return <strong key={key}>{children}</strong>;
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
