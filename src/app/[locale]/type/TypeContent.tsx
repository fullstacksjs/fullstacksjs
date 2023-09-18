'use client';

import { useKeyPress } from 'ahooks';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

import type { User } from '@/data-layer/supabase/models/User';

import { Game } from './+components/Game';
import { Result } from './+components/Result';
import type { Alphabet } from './alphabet';
import { isAlphabet } from './alphabet';
import {
  activeLetterAtom,
  handleCorrectAtom,
  handleSubmitLetter,
  isFinishedAtom,
  newRecordAtom,
} from './atoms';
import { audios } from './audio';

interface Props {
  initialRecord: number | undefined;
  user: User | undefined;
}

export const TypeContent = ({ initialRecord, user }: Props) => {
  const [activeLetter] = useAtom(activeLetterAtom);
  const [isFinished] = useAtom(isFinishedAtom);
  const [, correct] = useAtom(handleCorrectAtom);
  const [, submit] = useAtom(handleSubmitLetter);
  const [record, setRecord] = useAtom(newRecordAtom);

  useEffect(() => {
    if (initialRecord) setRecord(initialRecord);
  }, [initialRecord, setRecord]);

  useKeyPress(
    (event) => isAlphabet(event.key),
    (event) => {
      if (isFinished || event.ctrlKey) return;
      const pressedKey = event.key.toLowerCase() as Alphabet;
      const isCorrect = pressedKey === activeLetter;

      const sfx = isCorrect ? audios.click : audios.wrong;
      sfx.play();
      void submit(pressedKey);
    },
  );

  useKeyPress(['backspace'], () => {
    audios.backspace.play();
    correct();
  });

  return isFinished ? <Result user={user} record={record} /> : <Game />;
};
