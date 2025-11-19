import React from 'react';

function ContributorsSkeleton() {

    const skeletonArray = Array(36).fill(undefined)

  return (
    <div className="flex gap-5 flex-wrap justify-center items-center">
      {skeletonArray.map((item, index) => (
        <div key={index} className='w-[80px] h-[80px] rounded-full bg-white/70 animate-pulse'></div>
      ))}
    </div>
  );
}

export default ContributorsSkeleton;
