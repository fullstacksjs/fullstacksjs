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
    <div className="flex flex-col mobile:flex-col desktop:flex-row items-center gap-8 desktop:gap-16">
      <div className="flex justify-center items-center basis-40 shrink-0 h-40">
        <Logo className="w-40 aspect-auto" />
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="font-bold text-md text-center tablet:text-start tablet:text-2xl">
          {name}
        </h2>
        <p className="tablet:text-md text-light-1 text-center tablet:text-start">
          {description}
        </p>
        <div className="flex flex-wrap pt-[15px] tablet:p-0 gap-2.5 tablet:gap-5 justify-center tablet:justify-start items-center">
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
