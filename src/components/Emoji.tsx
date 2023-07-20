import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

interface Props {
  category:
    | 'Activities'
    | 'Objects'
    | 'People%20with%20professions'
    | 'Symbols';
  name: string;
  className?: string;
}

export const Emoji = ({ className, category, name }: Props) => {
  return (
    <Image
      src={`https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/${category}/${name}.png`}
      alt={`${name} Emoji`}
      className={twMerge('inline', className)}
      width={30}
      height={30}
    />
  );
};
