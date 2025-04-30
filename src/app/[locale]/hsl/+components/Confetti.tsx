'use client';
import Realistic from 'react-canvas-confetti/dist/presets/realistic';

export const Confetti = () => {
  return (
    <Realistic
      decorateOptions={(options) => ({
        ...options,
        particleCount: 4,
        decay: 0.9,
        colors: ['#f39f47', '#585858'],
      })}
    />
  );
};
