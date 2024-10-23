'use client';
import { createContext, useCallback, useContext } from 'react';

import type { Feature } from './Features';

const FeatureContext = createContext<(s: Feature) => boolean>(() => false);

interface Props {
  features: string[];
  children: React.ReactNode;
}

export const FeatureProvider = ({ children, features }: Props) => {
  const hasFeature = useCallback(
    (feature: Feature) => features.includes(feature),
    [features],
  );

  return (
    <FeatureContext.Provider value={hasFeature}>
      {children}
    </FeatureContext.Provider>
  );
};

export const useFeature = (feature: Feature) => {
  return useContext(FeatureContext)(feature);
};
