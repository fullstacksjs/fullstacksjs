import Image from 'next/image'
import React from 'react'
import ForwardIcon from "./ForwardIcon.svg"
import Link from 'next/link'

function Project() {
    return (
        <div className='flex flex-col mobile:flex-col desktop:flex-row items-center gap-12'>
            <Image
                height={110}
                width={140}
                alt="projects"
                className="self-center"
                src={"/projects/1.png"}
            />
            {/* title & desc */}
            <div>
                {/* title */}
                <Link href={"#"} className='flex items-center justify-center desktop:justify-start gap-4 text-light-0 hover:text-light-1 transition-all duration-500 '>
                    <h2 className='font-bold text-2xl/normal text-center'>@fullstacksjs/toobox</h2>
                    <ForwardIcon />
                </Link>
                {/* desc */}
                <h2 className='font-normal text-center desktop:text-left'>
                A zero-dependency 📦, type-safe 🚧, simple yet powerful library for defining and accessing configuration.
                </h2>
            </div>
        </div>
    )
}

export default Project