import type { Metadata } from 'next';

import { Button } from '@/components/Button';
import { Highlight } from '@/components/Highlight';
import { Anchor } from '@/components/Link';
import { generatePageOG } from '@/components/SEO';
import { getMobEvent } from '@/data-layer/datocms/getMobEvent';
import { notFound } from 'next/navigation';
import { SRCImage, StructuredText } from 'react-datocms';

export async function generateMetadata(): Promise<Metadata> {
  const event = await getMobEvent();

  return generatePageOG({
    title: 'Fullstacksjs MobReview',
    description:
      'A bi-weekly livestream where we collaboratively review codebases and explore best practices for clean, efficient, and maintainable code.',
    images: event?.thumbnail.src ?? '/og/og.png',
  });
}

export default async function Page() {
  const event = await getMobEvent();
  if (!event) return notFound();

  return (
    <div
      dir="rtl"
      className="flex flex-col-reverse gap-16 font-fa desktop:flex-row"
    >
      <article className="flex flex-col gap-16 wide:min-w-[600px]">
        <StructuredText
          data={event.heading}
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
        <div>
          <StructuredText
            data={event.description}
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
              if (type === 'strong')
                return <strong key={key}>{children}</strong>;
              if (type === 'a')
                return (
                  <Anchor href={props.href} key={key} target={props.target}>
                    {children}
                  </Anchor>
                );
              if (type === 'br') return <br key={key} />;
              if (type === 'mark')
                return <Highlight key={key}>{children}</Highlight>;
              return children;
            }}
          ></StructuredText>
        </div>
        <div className="flex gap-6">
          <Button asChild size="sm">
            <a href="/mob/calendar" target="_blank">
              افزودن به تقویم
            </a>
          </Button>
          <Button asChild size="sm" variant="outline">
            <a href="/mob/live" target="_blank">
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
