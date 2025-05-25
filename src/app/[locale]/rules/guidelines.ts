import type { Messages } from 'next-intl';

export type GuideLine = keyof Messages['rules']['guidelines']['items'];
export const guidelines: GuideLine[] = ['kind', 'topic', 'cross', 'opinion'];
