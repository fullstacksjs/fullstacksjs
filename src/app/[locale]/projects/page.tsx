import { generatePageOG } from '@/components/SEO';
import { NextIntlClientProvider } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server';
import React from 'react'
import ProjectCard from './+components/ProjectCard';


interface Image {
    src: string;
    alt: string;
    width: number;
    height: number;
}

export interface Project {
    name: string;
    description: string;
    image: Image;
    repo: string;
};


const projects: Project[] = [
    {
        name: "@fullstacksjs/toolbox",
        description: "A zero-dependency 📦, tree-shakable🌲 collection of missing JavaScript utilities.",
        image: {
            src: "ToolBox.png",
            alt: "Toolbox - JavaScript utility collection",
            width: 110,
            height: 110,
        },
        repo: "toolbox",
    },
    {
        name: "@fullstacksjs/eslint-config",
        description: "One configuration to rule them all.",
        image: {
            src: "Eslint.png",
            alt: "eslint-config",
            width: 110,
            height: 110,
        },
        repo: "eslint-config",
    },
    {
        name: "@fullstacksjs/config",
        description: "A zero-dependency 📦, type-safe 🚧, simple yet powerful library for defining and accessing configuration.",
        image: {
            src: "Configs.png",
            alt: "config",
            width: 110,
            height: 110,
        },
        repo: "config",
    },

]

export const metadata = generatePageOG({
    title: 'FullstacksJS Community Projects',
    description: 'A collection of open-source and collaborative projects for learning, teamwork, and improving programming skills.',
    images: '/og/og.png',
});

export default async function ProjectsPage({ params }: PageProps) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('projects');

    return (
        <NextIntlClientProvider>
            <h1 className='text-3xl font-bold leading-tight'>{t("title")}</h1>
            <div dir="ltr" className='flex flex-col gap-16'>
                {projects.map(project => (
                    <ProjectCard key={project.name} {...project} />
                ))}
            </div>
        </NextIntlClientProvider>
    )
}
