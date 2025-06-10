import { audios } from '@/components/Audio';

import type { ColorGameState } from './colorGameReducer';

export const handleWrongAnswer = (
  state: ColorGameState,
  correctIndex: number,
  selectedIndex: number,
): ColorGameState => {
  audios.wrong.play();
  return {
    ...state,
    gameOver: true,
    highlightedCorrectIndex: correctIndex,
    highlightedWrongIndex: selectedIndex,
  };
};
