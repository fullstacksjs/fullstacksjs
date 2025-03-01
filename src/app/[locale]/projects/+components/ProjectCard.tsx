import Link from 'next/link';
import React from 'react';

import type { Project } from '../page';

import ForwardIcon from './ForwardIcon.svg';

function ProjectCard({ name, description, logo: Logo, docUrl }: Project) {
  return (
    <Link
      className="flex flex-col mobile:flex-col desktop:flex-row items-center gap-8 align desktop:gap-16 grayscale hover:grayscale-0 pointer-coarse:grayscale-0 transition-all"
      href={docUrl}
      target="_blank"
    >
      <div className="flex justify-center items-center basis-[160px] shrink-0 h-[160px]">
        <Logo className="w-[160px] aspect-auto" />
      </div>
      <div className="flex flex-col gap-1">
        <div className="items-start flex justify-center desktop:justify-start gap-4 text-center tablet:text-start">
          <h2 className="font-bold text-2xl">{name}</h2>
          <ForwardIcon className="size-12 shrink-0 translate-y-2" />
        </div>

        <p className="text-md text-light-1 text-center desktop:text-start">
          {description}
        </p>
      </div>
    </Link>
  );
}

export default ProjectCard;
