'use client';
import { useKeyPress } from 'ahooks';
import { useAtom } from 'jotai';

import { Game } from './+components/Game';
import { Result } from './+components/Result';
import type { Alphabet } from './alphabet';
import { isAlphabet } from './alphabet';
import {
  activeLetterAtom,
  handleCorrectAtom,
  handleSubmitLetter,
  isFinishedAtom,
} from './atoms';
import { audios } from './audio';

export default function TypePage() {
  const [activeLetter] = useAtom(activeLetterAtom);
  const [isFinished] = useAtom(isFinishedAtom);
  const [, correct] = useAtom(handleCorrectAtom);
  const [, submit] = useAtom(handleSubmitLetter);

  useKeyPress(
    (event) => isAlphabet(event.key),
    (event) => {
      if (isFinished || event.ctrlKey) return;
      const pressedKey = event.key.toLowerCase() as Alphabet;
      const isCorrect = pressedKey === activeLetter;

      const sfx = isCorrect ? audios.click : audios.wrong;
      sfx.play();
      submit(pressedKey);
    },
  );

  useKeyPress(['backspace'], () => {
    audios.backspace.play();
    correct();
  });

  return isFinished ? <Result /> : <Game />;
}
