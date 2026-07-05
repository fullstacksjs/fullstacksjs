export const COLOR = {
  TOTAL_QUESTIONS: 20,
  MAX_LIGHTNESS_DIFFERENCE: 15,
  MIN_LIGHTNESS_DIFFERENCE: 3,
  SATURATION: 70,
  DEFAULT_BLOCK_COUNT: 12,
  BASE_LIGHTNESS_RANGE: { min: 40, max: 60 },
  HUE_RANGE: { min: 1, max: 360 },
} as const;

export const BLOCK_RANGES = [
  { max: 20, count: 3 },
  { max: 30, count: 4 },
  { max: 40, count: 5 },
  { max: 50, count: 6 },
  { max: 70, count: 7 },
  { max: 80, count: 8 },
  { max: 90, count: 9 },
  { max: 100, count: 12 },
] as const;
