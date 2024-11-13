import { Suspense } from 'react';

import { FocusProvider } from './FocusProvider';

export interface FocusItemListProps
  extends React.DetailedHTMLProps<
    React.OlHTMLAttributes<HTMLOListElement>,
    HTMLOListElement
  > {
  fallback?: React.ReactNode;
}

export const FocusItemList = ({ fallback, ...props }: FocusItemListProps) => {
  return (
    <Suspense fallback={fallback}>
      <FocusProvider>
        <ol {...props} className="ms-4" />
      </FocusProvider>
    </Suspense>
  );
};

export type RuleState = 'faded' | 'focused' | 'idle';
