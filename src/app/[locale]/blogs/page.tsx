import type { Metadata } from 'next';

import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import { generatePageOG } from '@/components/SEO';
import { getBlogs } from '@/data-layer/datocms/getBlogs';
import { routing } from '@/i18n/routing';

import { BlogItem } from './+components/BlogItem';

export const metadata: Metadata = generatePageOG({
  title: 'FullstacksJS Blog - Insights, Tutorials, and Community Updates',
  description:
    'Explore articles, tutorials, and insights from the FullstacksJS community. Learn about web development, best practices, and the latest trends.',
});

export default async function Blog() {
  setRequestLocale('fa');
  const blogs = await getBlogs();

  return (
    <div className="flex-1">
      <NextIntlClientProvider locale="fa">
        <ul dir="rtl" className="font-fa list-inside text-md">
          {blogs.map((blog) => (
            <BlogItem
              createdAt={new Date(blog.createdAt)}
              key={blog.slug}
              slug={blog.slug}
              title={blog.title}
            />
          ))}
        </ul>
      </NextIntlClientProvider>
    </div>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
