import { getRandom } from '@fullstacksjs/toolbox';

import { BLOCK_RANGES, COLOR } from './constants';

type LightnessAdjustment = 'brightness' | 'shade';

export const calculateExponentialDecayDifference = (
  questionIndex: number,
  totalQuestions: number,
): number => {
  const decayConstant = Math.log(
    COLOR.MAX_LIGHTNESS_DIFFERENCE / COLOR.MIN_LIGHTNESS_DIFFERENCE,
  );

  const progressFactor = questionIndex / totalQuestions;
  const rawDifference =
    COLOR.MAX_LIGHTNESS_DIFFERENCE * Math.exp(-decayConstant * progressFactor);

  return Math.max(COLOR.MIN_LIGHTNESS_DIFFERENCE, Math.round(rawDifference));
};

export const getProgressiveBlockCount = (progress: number): number => {
  const defaultCount = COLOR.DEFAULT_BLOCK_COUNT;
  return (
    BLOCK_RANGES.find((range) => progress < range.max)?.count || defaultCount
  );
};

export const getAdjustedLightness = (
  base: number,
  diff: number,
): { value: number; type: LightnessAdjustment } => {
  const type: LightnessAdjustment = getRandom(['shade', 'brightness']);
  const value = type === 'shade' ? base - diff : base + diff;
  return { value, type };
};
