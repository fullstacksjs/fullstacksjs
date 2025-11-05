import { Suspense } from 'react';

import { FocusProvider } from './FocusProvider';

interface Props
  extends React.DetailedHTMLProps<
    React.OlHTMLAttributes<HTMLOListElement>,
    HTMLOListElement
  > {
  fallback?: React.ReactNode;
}

export const FocusItemList = ({ fallback, ...props }: Props) => {
  return (
    <Suspense fallback={fallback}>
      <FocusProvider>
        <ol {...props} className="ms-4" />
      </FocusProvider>
    </Suspense>
  );
};
