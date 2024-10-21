import type { RichTranslationValues } from 'next-intl';

import { emojiTranslation } from '@/components/Emoji';
import { Highlight } from '@/components/Highlight';

export const i18nComponents: RichTranslationValues = {
  b: (chunks) => <b>{chunks}</b>,
  mark: (chunk) => <Highlight>{chunk}</Highlight>,
  br: () => <br />,
  ...emojiTranslation,
};
