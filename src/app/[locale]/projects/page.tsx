import { generatePageOG } from '@/components/SEO';
import { NextIntlClientProvider } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server';
import React from 'react'
import Project from './+components/Project';

export const metadata = generatePageOG({
    title: 'FullstacksJS Community Projects',
    description:
        '',
    images: '/og/og.png',
});

export default async function ProjectsPage({ params }: PageProps) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('projects');

    return (
        <NextIntlClientProvider>
            <h1 className='text-3xl font-bold leading-tight'>{t("title")}</h1>
            <Project />
            <Project />
            <Project />
        </NextIntlClientProvider>
    )
}
