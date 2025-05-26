import Image from 'next/image';

import { cn } from '@/utils/cn';

const emojiMaps = {
  tree: { path: 'Activities/Christmas Tree', className: '-translate-y-1' },
  star: { path: 'Travel and places/Glowing Star', className: '-translate-y-1' },
  robot: { path: 'Smilies/Robot', className: '-translate-y-1' },
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
      height={30}
      width={30}
      alt={`${name} Emoji`}
      className={cn('inline', emojiMaps[name].className, className)}
      src={`https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/${emojiMaps[name].path}.png`}
      unoptimized
    />
  );
};

export const emojiTranslation = {
  'e-tree': () => <Emoji name="tree" />,
  'e-star': () => <Emoji name="star" />,
  'e-medal': () => <Emoji name="first" />,
  'e-robot': () => <Emoji name="robot" />,
  'e-flag': () => <Emoji name="pirate" />,
  'e-party': () => <Emoji name="party" />,
};
