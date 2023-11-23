import { Emoji } from './Emoji';

interface Props {
  rank: number;
  fallback: React.ReactNode;
}

export const Medal = ({ rank, fallback }: Props) => {
  if (rank === 1) return <Emoji name="first" />;
  if (rank === 2) return <Emoji name="second" />;
  if (rank === 3) return <Emoji name="third" />;
  return fallback;
};
