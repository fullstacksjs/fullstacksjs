import { percent, randomInt, range } from '@fullstacksjs/toolbox';

import { generateColorBlocks } from './colorBlocks';
import { COLOR } from './constants';
import {
  calculateExponentialDecayDifference,
  getAdjustedLightness,
  getProgressiveBlockCount,
} from './progression';

export interface ColorQuestion {
  blocks: string[];
  correctIndex: number;
}

export const generateColorQuestions = (
  count: number = COLOR.TOTAL_QUESTIONS,
): ColorQuestion[] => {
  return range(count).map((_, i) => {
    const progress = percent(i, count);
    const blockCount = getProgressiveBlockCount(progress);

    const hue = randomInt(COLOR.HUE_RANGE.min, COLOR.HUE_RANGE.max);
    const baseLightness = randomInt(
      COLOR.BASE_LIGHTNESS_RANGE.min,
      COLOR.BASE_LIGHTNESS_RANGE.max,
    );
    const difference = calculateExponentialDecayDifference(i, count);

    const { value: adjustedLightness } = getAdjustedLightness(
      baseLightness,
      difference,
    );

    const { blocks, oddIndex } = generateColorBlocks(
      hue,
      COLOR.SATURATION,
      baseLightness,
      adjustedLightness,
      blockCount,
    );

    return {
      blocks,
      correctIndex: oddIndex,
    };
  });
};
