import { noop } from '@fullstacksjs/toolbox';
import { useAtom } from 'jotai';

import { cn } from '@/utils/cn';

import { activeLetterAtom, gameStateAtom, lettersAtom } from '../atoms';
import { Letter } from './Letter';
import { Retry } from './Retry';
import { Timer } from './Timer';

export const Game = () => {
  const [letters] = useAtom(lettersAtom);
  const [activeLetter] = useAtom(activeLetterAtom);
  const [gameState] = useAtom(gameStateAtom);

  return (
    <div>
      <div className={cn('flex w-full')}>
        <div className="relative flex flex-wrap gap-4">
          {letters.map(({ letter, status }) => (
            <Letter
              key={letter}
              active={letter === activeLetter}
              correct={status === 'correct'}
              error={status === 'error'}
            >
              {letter}
            </Letter>
          ))}
        </div>
      </div>
      <div className="flex w-full flex-col items-center gap-2 text-center">
        <Timer />
        {gameState === 'idle' && <p className="opacity-50">Press A ...</p>}
        {gameState === 'typing' && <Retry onClick={noop} />}
      </div>
    </div>
  );
};
