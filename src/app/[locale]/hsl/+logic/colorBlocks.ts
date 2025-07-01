import { randomInt, range } from '@fullstacksjs/toolbox';

const hsl = (h: number, s: number, l: number): string =>
  `hsl(${h}, ${s}%, ${l}%)`;

export const generateColorBlocks = (
  hue: number,
  saturation: number,
  baseLightness: number,
  adjustedLightness: number,
  blockCount: number,
): { blocks: string[]; oddIndex: number } => {
  const oddIndex = randomInt(0, blockCount - 1);
  const baseColor = hsl(hue, saturation, baseLightness);
  const oddColor = hsl(hue, saturation, adjustedLightness);

  const blocks = range(blockCount).map((_blockIndex, index) => {
    return index === oddIndex ? oddColor : baseColor;
  });

  return { blocks, oddIndex };
};
