import React from 'react'
import ForwardIcon from "./ForwardIcon.svg"
import Link from 'next/link'
import { Project } from '../page'


function ProjectCard({name , description , logo , repo} : Project) {
    return (
        <div className='flex flex-col mobile:flex-col desktop:flex-row items-center desktop:gap-16'>
           <div className='w-[200px] h-[200px]'>
            {logo}
           </div>
            <div>
            <Link 
                 target='_blank' 
                 href={`https://github.com/fullstacksjs/${repo}`} 
                 className='pb-4 flex items-center justify-center desktop:justify-start gap-4 text-light-0 hover:text-light-1 transition-all duration-500'
                >
                   <h2 className='font-bold text-2xl/none'>{name}</h2>
                   <ForwardIcon  />
            </Link>

                <h2 className='font-normal text-md text-light-1 text-center desktop:text-left'>
                  {description}
                </h2>
            </div>
        </div>
    )
}

export default ProjectCard