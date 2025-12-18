'use client';

import { Provider } from 'jotai';

interface Props {
  children: React.ReactNode;
}

export const JotaiProvider = ({ children }: Props) => {
  return <Provider>{children}</Provider>;
};
