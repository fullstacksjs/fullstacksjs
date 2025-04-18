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

function randomShadeOrBrightness(): 'brightness' | 'shade' {
  return Math.random() > 0.5 ? 'shade' : 'brightness';
}

export function generateColorQuestions(count: number = 20): ColorQuestion[] {
  return Array.from({ length: count }, (_, i) => {
    const hue = Math.floor(Math.random() * 360);
    const saturation = 70;
    const baseLightness = 40 + Math.floor(Math.random() * 20);
    const difference = calculateDifference(i, count);
    const oddIndex = Math.floor(Math.random() * 6);
    const shadeOrBrightness = randomShadeOrBrightness();
    const adjustedLightness =
      shadeOrBrightness === 'shade'
        ? baseLightness - difference
        : baseLightness + difference;

    const baseColor = hsl(hue, saturation, baseLightness);
    const oddColor = hsl(hue, saturation, adjustedLightness);

    const blocks = Array.from({ length: 6 }, (__, index) =>
      index === oddIndex ? oddColor : baseColor,
    );

    return {
      blocks,
      correctIndex: oddIndex,
    };
  });
}
