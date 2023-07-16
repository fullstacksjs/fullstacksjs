import Image from 'next/image';

interface Props {
  category:
    | 'Activities'
    | 'Objects'
    | 'People%20with%20professions'
    | 'Symbols';
  name: string;
}

export const Emoji = ({ category, name }: Props) => {
  return (
    <Image
      src={`https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/${category}/${name}.png`}
      alt={`${name} Emoji`}
      className="inline"
      width={30}
      height={30}
    />
  );
};
