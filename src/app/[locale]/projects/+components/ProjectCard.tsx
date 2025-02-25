import Image from 'next/image'
import React from 'react'
import ForwardIcon from "./ForwardIcon.svg"
import Link from 'next/link'
import { Project } from '../page'

function ProjectCard({name , description , image , repo} : Project) {
    return (
        <div className='flex flex-col mobile:flex-col desktop:flex-row items-center gap-12 desktop:gap-16'>
            <Image
                height={image.height}
                width={image.width}
                alt={`FullstacksJS ${image.alt}`}
                src={`/projects/${image.src}`}
            />
            {/* title & desc */}
            <div>
                {/* title */}
                <Link target='_blank' href={`https://github.com/fullstacksjs/${repo}`} className='flex items-center justify-center desktop:justify-start gap-4 text-light-0 hover:text-light-1 transition-all duration-500 '>
                    <h2 className='font-bold text-2xl/normal text-center'>{name}</h2>
                    <ForwardIcon />
                </Link>
                {/* desc */}
                <h2 className='font-normal text-md text-light-1 text-center desktop:text-left'>
                  {description}
                </h2>
            </div>
        </div>
    )
}

export default ProjectCard