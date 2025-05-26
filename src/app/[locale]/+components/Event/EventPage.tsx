import type {
  ResponsiveImageType,
  StructuredTextGraphQlResponse,
} from 'react-datocms';

import { SRCImage, StructuredText } from 'react-datocms';

import { Highlight } from '@/components/Highlight';
import { Anchor } from '@/components/Link';

interface EventTitleProps {
  data: StructuredTextGraphQlResponse;
}

export function EventTitle({ data }: EventTitleProps) {
  return (
    <StructuredText
      data={data}
      renderNode={(type, { key }, children) => {
        if (type === 'h1')
          return (
            <h1 className="text-xl font-bold" key={key}>
              {children}
            </h1>
          );
        return children;
      }}
    ></StructuredText>
  );
}

interface Props {
  heading: StructuredTextGraphQlResponse;
  description: StructuredTextGraphQlResponse;
  thumbnail: ResponsiveImageType;
  children: React.ReactNode;
}

export const EventPage = ({
  heading,
  thumbnail,
  description,
  children,
}: Props) => {
  return (
    <div
      dir="rtl"
      className="flex flex-col-reverse gap-16 font-fa desktop:flex-row"
    >
      <article className="flex flex-col gap-16 wide:min-w-[600px]">
        <EventTitle data={heading} />
        <div>
          <EventDescription data={description} />
        </div>
        <EventActions>{children}</EventActions>
      </article>
      <div className="desktop:min-w-[450px]">
        <SRCImage data={thumbnail} priority />
      </div>
    </div>
  );
};

function EventDescription({ data }: { data: StructuredTextGraphQlResponse }) {
  return (
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
        if (type === 'mark') return <Highlight key={key}>{children}</Highlight>;
        return children;
      }}
    ></StructuredText>
  );
}

export function EventActions({ children }: React.PropsWithChildren) {
  return <div className="flex gap-6">{children}</div>;
}
