import type { ResponsiveImageType } from 'react-datocms/image';

import Image from 'next/image';

import type { Lecturer } from '@/data-layer/datocms/Event';

import { cn } from '@/utils/cn';

interface Props {
  className?: string;
  lecturers: Lecturer[];
}

export const Avatar = ({
  image,
  className,
}: {
  image: ResponsiveImageType;
  className?: string;
}) => {
  return (
    <Image
      height={image.height!}
      width={image.width}
      alt={image.alt!}
      className={cn('rounded-full border-4 border-bg-0', className)}
      src={image.src!}
    />
  );
};

export const LecturerStack = ({ lecturers, className }: Props) => {
  const isSingle = lecturers.length === 1;
  return (
    <div
      className={cn(
        'flex flex-col items-start',
        { 'mt-6': !isSingle },
        className,
      )}
    >
      {!isSingle ? (
        lecturers.map(({ avatar, name }) => (
          <Avatar className="-mt-6 " image={avatar} key={name} />
        ))
      ) : (
        <Avatar className="shrink-0" image={lecturers[0]!.avatar} />
      )}
    </div>
  );
};
