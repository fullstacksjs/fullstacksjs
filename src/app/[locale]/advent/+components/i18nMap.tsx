import type { RichTranslationValues } from 'next-intl';

import { emojiTranslation } from '@/components/Emoji';
import { Highlight } from '@/components/Highlight';
import { Anchor } from '@/components/Link';
import { Link } from '@/navigation';

export const i18nMap: RichTranslationValues = {
  ...emojiTranslation,
  mark: (chunk) => <Highlight>{chunk}</Highlight>,
  b: (chunk) => <b>{chunk}</b>,
  'l-leader': (chunk) => (
    <Anchor asChild>
      <Link href="/advent/board">{chunk}</Link>
    </Anchor>
  ),
  'a-tg': (chunk) => (
    <Anchor href="https://t.me/fullstacksjs/163643">{chunk}</Anchor>
  ),
  'a-settings': (chunk) => (
    <Anchor href="https://adventofcode.com/2023/settings">{chunk}</Anchor>
  ),
  'a-leader': (chunk) => (
    <Anchor href="https://adventofcode.com/2023/leaderboard/private/view/3205245">
      {chunk}
    </Anchor>
  ),
  'a-advent': (chunk) => (
    <Anchor href="https://adventofcode.com/2023">{chunk}</Anchor>
  ),
};
