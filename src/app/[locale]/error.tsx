'use client';

import { useEffect } from 'react';

import { Button } from '@/components/Button';

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
        <Button
          className="mx-auto my-8 outline-1 outline-offset-4 outline-accent-0 ring-4 ring-accent-0/30 hover:ring-[6px] hover:ring-accent-0/40 focus:outline"
          onClick={() => reset()}
        >
          Try again
        </Button>
      </div>
    </div>
  );
}
