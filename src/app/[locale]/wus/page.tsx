import { Button } from '@/components/Button';
import { Highlight } from '@/components/Highlight';
import { getWusEvent } from '@/data-layer/datocms/getWusLinks';
import { notFound } from 'next/navigation';
import { SRCImage, StructuredText } from 'react-datocms';

export default async function Page() {
  const event = await getWusEvent();
  if (!event) return notFound();

  return (
    <div
      dir="rtl"
      className="flex flex-col-reverse gap-16 font-fa desktop:flex-row"
    >
      <article className="flex flex-col gap-16">
        <StructuredText
          data={event.heading}
          renderNode={(type, key, children) => {
            if (type === 'h1')
              return (
                <h1 className="text-xl font-bold" key={key}>
                  {children}
                </h1>
              );
            return children;
          }}
        ></StructuredText>
        <StructuredText
          data={event.description}
          renderNode={(type, key, children) => {
            if (type === 'p')
              return (
                <p className="text-fg-1" key={key}>
                  {children}
                </p>
              );
            if (type === 'br') return <br key={key} />;
            if (type === 'mark')
              return <Highlight key={key}>{children}</Highlight>;
            return children;
          }}
        ></StructuredText>
        <div className="flex gap-6">
          <Button asChild size="sm">
            <a href="/wus/calendar" target="_blank">
              افزودن به تقویم
            </a>
          </Button>
          <Button asChild size="sm" variant="outline">
            <a href="/wus/live" target="_blank">
              وارد جلسه شوید
            </a>
          </Button>
        </div>
      </article>
      <div className="desktop:min-w-[450px]">
        <SRCImage data={event.thumbnail} />
      </div>
    </div>
  );
}
