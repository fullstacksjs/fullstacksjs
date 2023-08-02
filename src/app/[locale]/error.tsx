'use client'; // Error components must be Client Components

import { Button } from '@/components/Button';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="text-center min-h-[calc(100vh-600px)] grid place-items-center">
      <div>
        <h2>Something went wrong!</h2>
        <Button
          className="outline-1 outline-offset-4 outline-accent-0 ring-4 ring-accent-0/30 hover:ring-[6px] hover:ring-accent-0/40 focus:outline mx-auto my-8"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </Button>
      </div>
    </div>
  );
}
