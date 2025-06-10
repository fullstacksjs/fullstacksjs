import { audios } from '@/components/Audio';

import { COLOR } from '../+logic/constants';
import { generateColorQuestions } from '../+logic/questionGenerator';
import { createInitialState } from './createInitialState';

export const handleTryAgain = () => {
  audios.restart.play();
  return createInitialState(generateColorQuestions(COLOR.TOTAL_QUESTIONS));
};
