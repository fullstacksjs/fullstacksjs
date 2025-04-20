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
  const minDifference = 1;
  const decayConstant = Math.log(maxDifference / minDifference);

  const progressFactor = questionIndex / totalQuestions;
  const raw = maxDifference * Math.exp(-decayConstant * progressFactor);
  const rounded = Math.round(raw);
  return Math.max(minDifference, rounded);
}

export function generateColorQuestions(count: number = 20): ColorQuestion[] {
  return range(count).map((_, i) => {
    const hue = randomInt(1, 360);
    const saturation = 70;
    const baseLightness = randomInt(40, 60);
    const difference = calculateDifference(i, count);
    const oddIndex = randomInt(0, 5);
    const shadeOrBrightness = getRandom(['shade', 'brightness']);
    const adjustedLightness =
      shadeOrBrightness === 'shade'
        ? baseLightness - difference
        : baseLightness + difference;

    const baseColor = hsl(hue, saturation, baseLightness);
    const oddColor = hsl(hue, saturation, adjustedLightness);

    const blocks = range(6).map((_blockIndex, index) => {
      return index === oddIndex ? oddColor : baseColor;
    });
    return {
      blocks,
      correctIndex: oddIndex,
    };
  });
}
