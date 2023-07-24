import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

const emojiMaps = {
  pirate: { path: 'Symbols/Pirate Flag', className: undefined },
  party: { path: 'Activities/Party Popper', className: '-translate-y-2' },
  first: { path: 'Activities/1st Place Medal', className: undefined },
  second: { path: 'Activities/2nd Place Medal', className: undefined },
  third: { path: 'Activities/3rd Place Medal', className: undefined },
} satisfies Record<string, { className: string | undefined; path: string }>;

interface Props {
  name: keyof typeof emojiMaps;
  className?: string;
}

export const Emoji = ({ className, name }: Props) => {
  return (
    <Image
      src={`https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/${emojiMaps[name].path}.png`}
      alt={`${name} Emoji`}
      className={twMerge('inline', emojiMaps[name].className, className)}
      width={30}
      height={30}
    />
  );
};
