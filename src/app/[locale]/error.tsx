'use client';

import { C2AButton } from '@/components/C2AButton';
import { useEffect } from 'react';

interface Props {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="grid min-h-[calc(100vh-600px)] place-items-center text-center">
      <div>
        <h2>Something went wrong!</h2>
        <C2AButton onClick={() => reset()}>Try again</C2AButton>
      </div>
    </div>
  );
}
