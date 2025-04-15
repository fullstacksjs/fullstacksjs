import { generatePageOG } from '@/components/SEO';
import { getServerFeature } from '@/config/features/getServerFeatures';
import { routing } from '@/i18n/routing';
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import React from 'react';

import Config from './+components/Config.svg';
import Eslint from './+components/Eslint.svg';
import NCLU from './+components/NCLU.svg';
import ProjectCard from './+components/ProjectCard';
import ToolBox from './+components/ToolBox.svg';
import YDKHTML from './+components/YDKHTML.svg';

export interface Project {
  name: string;
  description: string;
  logo: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  repoUrl: string;
  docUrl?: string;
  npmUrl?: string;
}

const projects: Project[] = [
  {
    name: '@fullstacksjs/toolbox',
    description:
      'A zero-dependency 📦, tree-shakable🌲 collection of missing JavaScript utilities.',
    logo: ToolBox,
    repoUrl: 'https://github.com/fullstacksjs/toolbox',
    docUrl: 'https://toolbox.fullstacksjs.com/',
    npmUrl: 'https://www.npmjs.com/package/@fullstacksjs/toolbox',
  },
  {
    name: '@fullstacksjs/eslint-config',
    description: 'One configuration to rule them all.',
    logo: Eslint,
    repoUrl: 'https://github.com/fullstacksjs/eslint-config',
    npmUrl: 'https://www.npmjs.com/package/@fullstacksjs/eslint-config',
  },
  {
    name: '@fullstacksjs/config',
    description:
      'A zero-dependency 📦, type-safe 🚧, simple yet powerful library for defining and accessing configuration.',
    logo: Config,
    repoUrl: 'https://github.com/fullstacksjs/config',
    docUrl: 'https://config.fullstacksjs.com/',
    npmUrl: 'https://www.npmjs.com/package/@fullstacksjs/config',
  },
  {
    name: 'NPM Check Last Publish',
    description:
      'A simple CLI tool that helps developers check the last published versions of their project dependencies.',
    logo: NCLU,
    repoUrl: 'https://github.com/fullstacksjs/npm-check-last-publish',
    npmUrl: 'https://www.npmjs.com/package/npm-check-last-publish',
  },
  {
    name: 'You Don’t Know HTML',
    description:
      'An open-source, community-driven quiz game to test your HTML skills. Discover fun challenges and see how well you really know your tags and attributes!',
    logo: YDKHTML,
    repoUrl: 'https://github.com/fullstacksjs/you-dont-know-html',
    docUrl: 'https://www.youdontknowhtml.com',
  },
];

export const metadata = generatePageOG({
  title: 'FullstacksJS Community Projects',
  description:
    'A collection of open-source and collaborative projects for learning, teamwork, and improving programming skills.',
});

export default async function ProjectsPage({ params }: PageProps) {
  const feature = getServerFeature('projects');
  if (!feature) return notFound();

  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('projects');

  return (
    <NextIntlClientProvider>
      <div className="flex flex-col gap-20">
        <h1 className="text-3xl font-bold leading-tight">{t('title')}</h1>
        <div dir="ltr" className="flex flex-col gap-20">
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
