import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { SRCImage, StructuredText } from 'react-datocms';

import { getDatoNode } from '@/components/getDatoNode';
import { getBlog } from '@/data-layer/datocms/getBlog';
import { getBlogs } from '@/data-layer/datocms/getBlogs';
import { locales } from '@/i18n/locales';

export default async function BlogPage({
  params,
}: PageProps<{ slug: string }>) {
  setRequestLocale('fa');
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) return notFound();

  return (
    <div className="flex flex-col gap-16">
      <SRCImage data={blog.banner} />
      <div className="leading-relaxed flex flex-col gap-4">
        <StructuredText
          data={blog.content}
          renderNode={(type, props, children) => {
            if (type === 'p')
              return <p className="text-fg-1 mb-2">{children}</p>;
            return getDatoNode(type, props, children);
          }}
        />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const blogs = await getBlogs();
  const params = blogs.map((blog) => ({ slug: blog.slug }));
  return locales.flatMap((locale) =>
    params.map((param) => ({ ...param, locale })),
  );
}
