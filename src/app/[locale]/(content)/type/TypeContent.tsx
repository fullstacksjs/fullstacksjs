'use client';

import { useAtom } from 'jotai';
import { useEffect, useEffectEvent } from 'react';

import type { User } from '@/data-layer/supabase/models/User';

import { audios } from '@/components/Audio';

import type { Alphabet } from './alphabet';

import { Game } from './+components/Game';
import { Result } from './+components/Result';
import { isAlphabet } from './alphabet';
import {
  activeLetterAtom,
  handleCorrectAtom,
  handleSubmitLetter,
  isFinishedAtom,
  newRecordAtom,
} from './atoms';

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

  const handler = useEffectEvent((event: KeyboardEvent) => {
    if (isAlphabet(event.key)) {
      if (isFinished || event.ctrlKey) return;
      const pressedKey = event.key.toLowerCase() as Alphabet;
      const isCorrect = pressedKey === activeLetter;

      const sfx = isCorrect ? audios.click : audios.wrong;
      sfx.play();
      void submit(pressedKey);
    }
    if (event.key === 'Backspace') {
      if (isFinished) return;
      audios.backspace.play();
      correct();
    }
  });

  useEffect(() => {
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return isFinished ? <Result user={user} record={record} /> : <Game />;
};
