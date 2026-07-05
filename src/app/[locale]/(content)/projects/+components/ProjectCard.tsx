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
    <div className="flex flex-col items-center gap-8 mobile:flex-col desktop:flex-row desktop:gap-16">
      <div className="flex h-40 shrink-0 basis-40 items-center justify-center">
        <Logo className="aspect-auto w-40" />
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-center text-md font-bold tablet:text-start tablet:text-2xl">
          {name}
        </h2>
        <p className="text-center text-light-1 tablet:text-start tablet:text-md">
          {description}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-[15px] tablet:justify-start tablet:gap-5 tablet:p-0">
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
