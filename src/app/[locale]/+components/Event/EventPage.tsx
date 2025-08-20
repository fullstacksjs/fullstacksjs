import type {
  ResponsiveImageType,
  StructuredTextGraphQlResponse,
} from 'react-datocms';

import { SRCImage, StructuredText } from 'react-datocms';

import { getDatoNode } from '@/components/getDatoNode';

interface EventTitleProps {
  data: StructuredTextGraphQlResponse;
}

function EventTitle({ data }: EventTitleProps) {
  return <StructuredText data={data} renderNode={getDatoNode} />;
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
  return <StructuredText data={data} renderNode={getDatoNode} />;
}

export function EventActions({ children }: React.PropsWithChildren) {
  return <div className="flex gap-6">{children}</div>;
}
