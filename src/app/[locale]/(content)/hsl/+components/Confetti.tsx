'use client';

import Pride from 'react-canvas-confetti/dist/presets/pride';

export const Confetti = () => {
  return (
    <Pride
      autorun={{
        speed: 20,
      }}
      decorateOptions={(options) => ({
        ...options,
        particleCount: 4,
        decay: 0.9,
        colors: ['#f39f47', '#585858'],
      })}
    />
  );
};
