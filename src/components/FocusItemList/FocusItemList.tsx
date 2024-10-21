import { Suspense } from 'react';

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
      <ol {...props} className="ms-4" />
    </Suspense>
  );
};

export type RuleState = 'faded' | 'focused' | 'idle';
