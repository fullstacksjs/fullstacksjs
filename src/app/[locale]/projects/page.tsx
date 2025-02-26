import React from 'react'
import { generatePageOG } from '@/components/SEO';
import { NextIntlClientProvider } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server';
import ProjectCard from './+components/ProjectCard';
import ToolBox from './+components/ToolBox';
import Eslint from './+components/Eslint';
import Config from './+components/Config';



export interface Project {
    name: string;
    description: string;
    logo: React.JSX.Element;
    repo: string;
};


const projects: Project[] = [
    {
        name: "@fullstacksjs/toolbox",
        description: "A zero-dependency 📦, tree-shakable🌲 collection of missing JavaScript utilities.",
        logo: <ToolBox />,
        repo: "toolbox",
    },
    {
        name: "@fullstacksjs/eslint-config",
        description: "One configuration to rule them all.",
        logo: <Eslint />,
        repo: "eslint-config",
    },
    {
        name: "@fullstacksjs/config",
        description: "A zero-dependency 📦, type-safe 🚧, simple yet powerful library for defining and accessing configuration.",
        logo: <Config />,
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
            <div dir="ltr" className='flex flex-col gap-10 desktop:gap-0'>
                {projects.map(project => (
                    <ProjectCard key={project.name} {...project} />
                ))}
            </div>
        </NextIntlClientProvider>
    )
}
