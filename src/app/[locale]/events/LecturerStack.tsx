/* eslint-disable jsx-a11y/alt-text */
import Image from 'next/image';
import type { ResponsiveImageType } from 'react-datocms/image';

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
      className={cn('rounded-full border-4 border-bg-0', className)}
      src={image.src!}
      alt={image.alt!}
      width={image.width}
      height={image.height!}
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
          <Avatar className="-mt-6 " key={name} image={avatar} />
        ))
      ) : (
        <Avatar className="shrink-0" image={lecturers[0]!.avatar} />
      )}
    </div>
  );
};
