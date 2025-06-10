export const ActionTypes = {
  SELECT_ANSWER: 'SELECT_ANSWER',
  SET_HIGHEST_SCORE: 'SET_HIGHEST_SCORE',
  TRY_AGAIN: 'TRY_AGAIN',
} as const;

export type Action =
  | {
      type: typeof ActionTypes.SELECT_ANSWER;
      payload: { index: number; correctIndex: number };
    }
  | {
      type: typeof ActionTypes.SET_HIGHEST_SCORE;
      payload: number;
    }
  | {
      type: typeof ActionTypes.TRY_AGAIN;
    };
