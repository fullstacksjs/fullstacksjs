import type { Project } from '../page';

import GitHub from './GitHub.svg';
import HomePage from './HomePage.svg';
import Npm from './Npm.svg';
import { ResourceLink } from './ResourceLink';

export function ProjectCard({
  name,
  description,
  logo: Logo,
  docUrl,
  repoUrl,
  npmUrl,
}: Project) {
  return (
    <div className="flex flex-row items-start gap-8 desktop:flex-row desktop:gap-16">
      <div className="flex h-40 shrink-0 basis-40 items-start justify-center">
        <Logo className="aspect-auto w-30 tablet:w-40" />
      </div>
      <div className="flex w-full flex-col">
        <h2 className="text-start text-md font-bold tablet:text-2xl">{name}</h2>
        <p className="w-full text-start text-light-1 tablet:text-md">
          {description}
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-start gap-2 tablet:gap-5 tablet:p-0">
          {docUrl && (
            <ResourceLink url={docUrl} icon={HomePage}>
              Home Page
            </ResourceLink>
          )}
          {repoUrl && (
            <ResourceLink url={repoUrl} icon={GitHub}>
              GitHub Repo
            </ResourceLink>
          )}
          {npmUrl && (
            <ResourceLink url={npmUrl} icon={Npm}>
              NPM Package
            </ResourceLink>
          )}
        </div>
      </div>
    </div>
  );
}
