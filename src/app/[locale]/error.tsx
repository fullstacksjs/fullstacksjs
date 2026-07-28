'use client';

import { useCallback, useEffect } from 'react';

import { C2AButton } from '@/components/C2AButton';

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

  const handleReset = useCallback(() => reset(), [reset]);

  return (
    <div className="grid min-h-[calc(100vh-600px)] place-items-center text-center">
      <div>
        <h2>Something went wrong!</h2>
        <C2AButton onClick={handleReset}>Try again</C2AButton>
      </div>
    </div>
  );
}
