import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import { getBlogs } from '@/data-layer/datocms/getBlogs';
import { Link, routing } from '@/i18n/routing';

export default async function Blog() {
  setRequestLocale('fa');
  const blogs = await getBlogs();

  return (
    <div className="flex-1">
      <NextIntlClientProvider locale="fa">
        <ul dir="rtl" className="font-fa list-inside text-md">
          {blogs.map((blog) => (
            <li className="mt-4" key={blog.slug}>
              <Link
                className="transition-colors opacity-50 group hover:opacity-100 flex items-center justify-between gap-4"
                href={`/blogs/${blog.slug}`}
              >
                <div className="w-0 size-2 rounded-full bg-fg-1 group-hover:w-6 transition-all" />
                {blog.title}
                <div className="flex-1 border-b-1 border-fg-1 border-dashed opacity-15" />
                <div className="text-sm text-fg-1 opacity-70">
                  {blog.createdAt.toLocaleDateString('fa-IR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </NextIntlClientProvider>
    </div>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
