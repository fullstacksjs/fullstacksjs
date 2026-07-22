import type { RichTranslationValues } from 'next-intl';

import { Emoji } from '@/components/Emoji';
import { Highlight } from '@/components/Highlight';

const emojiTranslation = {
  'e-tree': () => <Emoji name="tree" />,
  'e-star': () => <Emoji name="star" />,
  'e-medal': () => <Emoji name="first" />,
  'e-robot': () => <Emoji name="robot" />,
  'e-flag': () => <Emoji name="pirate" />,
  'e-party': () => <Emoji name="party" />,
};

export const i18nComponents: RichTranslationValues = {
  b: (chunks) => <b>{chunks}</b>,
  mark: (chunk) => <Highlight>{chunk}</Highlight>,
  br: () => <br />,
  ...emojiTranslation,
};
