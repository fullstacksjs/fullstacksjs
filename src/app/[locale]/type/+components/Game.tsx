import { noop } from '@fullstacksjs/toolbox';
import { useAtom } from 'jotai';

import { activeLetterAtom, gameStateAtom, lettersAtom } from '../atoms';
import { Letter } from './Letter';
import { Retry } from './Retry';
import { Timer } from './Timer';

export const Game = () => {
  const [letters] = useAtom(lettersAtom);
  const [activeLetter] = useAtom(activeLetterAtom);
  const [gameState] = useAtom(gameStateAtom);

  return (
    <div className="flex flex-col gap-12">
      <div className="relative flex w-full flex-wrap gap-4 text-5xl tablet:text-5xl">
        {letters.map(({ letter, status }) => (
          <Letter key={letter} active={letter === activeLetter} status={status}>
            {letter}
          </Letter>
        ))}
      </div>
      <div className="flex w-full flex-col items-center gap-2 text-center">
        <Timer />
        {gameState === 'idle' && <p className="opacity-50">Press A ...</p>}
        {gameState === 'typing' && <Retry onClick={noop} />}
      </div>
    </div>
  );
};
