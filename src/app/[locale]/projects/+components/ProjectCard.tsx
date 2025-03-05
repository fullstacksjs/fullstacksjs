import React from 'react';
import type { Project } from '../page';
import ResourceLink from './ResourceLink';

import HomePage from './HomePage.svg';
import GitHub from './GitHub.svg';
import Npm from './Npm.svg';

function ProjectCard({
  name,
  description,
  logo: Logo,
  docUrl,
  repoUrl,
  npmUrl,
}: Project) {
  return (
    <div className="flex flex-col mobile:flex-col desktop:flex-row items-center gap-8 desktop:gap-16">
      <div className="flex justify-center items-center basis-[160px] shrink-0 h-[160px]">
        <Logo className="w-[160px] aspect-auto" />
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
            <ResourceLink title="Home Page" url={docUrl} icon={HomePage} />
          )}
          {repoUrl && (
            <ResourceLink title="GitHub Repo" url={repoUrl} icon={GitHub} />
          )}
          {npmUrl && (
            <ResourceLink title="NPM Package" url={npmUrl} icon={Npm} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
