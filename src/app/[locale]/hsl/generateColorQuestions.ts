import { getRandom, randomInt, range } from '@fullstacksjs/toolbox';

export interface ColorQuestion {
  blocks: string[];
  correctIndex: number;
}

function hsl(h: number, s: number, l: number): string {
  return `hsl(${h}, ${s}%, ${l}%)`;
}

function calculateDifference(
  questionIndex: number,
  totalQuestions: number,
): number {
  const maxDifference = 15;
  const minDifference = 3;
  const decayConstant = Math.log(maxDifference / minDifference);

  const progressFactor = questionIndex / totalQuestions;
  const raw = maxDifference * Math.exp(-decayConstant * progressFactor);
  const rounded = Math.round(raw);
  return Math.max(minDifference, rounded);
}

function getBlockCount(progress: number): number {
  if (progress < 20) return 3;
  if (progress < 30) return 4;
  if (progress < 40) return 5;
  if (progress < 50) return 6;
  if (progress < 70) return 7;
  if (progress < 80) return 8;
  if (progress < 90) return 9;
  return 12;
}

export function generateColorQuestions(count: number = 20): ColorQuestion[] {
  return range(count).map((_, i) => {
    const progress = (i / count) * 100;
    const blockCount = getBlockCount(progress);

    const hue = randomInt(1, 360);
    const saturation = 70;
    const baseLightness = randomInt(40, 60);
    const difference = calculateDifference(i, count);
    const oddIndex = randomInt(0, blockCount - 1);
    const shadeOrBrightness = getRandom(['shade', 'brightness']);
    const adjustedLightness =
      shadeOrBrightness === 'shade'
        ? baseLightness - difference
        : baseLightness + difference;

    const baseColor = hsl(hue, saturation, baseLightness);
    const oddColor = hsl(hue, saturation, adjustedLightness);
    const blocks = range(blockCount).map((_blockIndex, index) => {
      return index === oddIndex ? oddColor : baseColor;
    });
    return {
      blocks,
      correctIndex: oddIndex,
    };
  });
}
