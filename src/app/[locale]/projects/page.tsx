import { generatePageOG } from '@/components/SEO';
import { routing } from '@/i18n/routing';
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import React from 'react';

import Config from './+components/Config.svg';
import Eslint from './+components/Eslint.svg';
import ProjectCard from './+components/ProjectCard';
import ToolBox from './+components/ToolBox.svg';

export interface Project {
  name: string;
  description: string;
  logo: React.FC<React.SVGProps<SVGSVGElement>>;
  docUrl: string;
  repoUrl: string;
}

const projects: Project[] = [
  {
    name: '@fullstacksjs/toolbox',
    description:
      'A zero-dependency 📦, tree-shakable🌲 collection of missing JavaScript utilities.',
    logo: ToolBox,
    repoUrl: 'https://github.com/fullstacksjs/toolbox',
    docUrl: 'https://toolbox.fullstacksjs.com/',
  },
  {
    name: '@fullstacksjs/eslint-config',
    description: 'One configuration to rule them all.',
    logo: Eslint,
    repoUrl: 'https://github.com/fullstacksjs/eslint-config',
    docUrl: 'https://github.com/fullstacksjs/eslint-config',
  },
  {
    name: '@fullstacksjs/config',
    description:
      'A zero-dependency 📦, type-safe 🚧, simple yet powerful library for defining and accessing configuration.',
    logo: Config,
    repoUrl: 'https://github.com/fullstacksjs/config',
    docUrl: 'https://config.fullstacksjs.com/',
  },
];

export const metadata = generatePageOG({
  title: 'FullstacksJS Community Projects',
  description:
    'A collection of open-source and collaborative projects for learning, teamwork, and improving programming skills.',
  images: '/og/og.png',
});

export default async function ProjectsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('projects');

  return (
    <NextIntlClientProvider>
      <div className="flex flex-col gap-20">
        <h1 className="text-3xl font-bold leading-tight">{t('title')}</h1>
        <div dir="ltr" className="flex flex-col gap-30 desktop:gap-20">
          {projects.map((project) => (
            <ProjectCard key={project.name} {...project} />
          ))}
        </div>
      </div>
    </NextIntlClientProvider>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
