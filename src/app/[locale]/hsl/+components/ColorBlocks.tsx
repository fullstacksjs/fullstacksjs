import React from 'react';

import { cn } from '@/utils/cn';

interface ColorBlocksProps {
  blocks: string[];
  correctIndex: number;
  highlightedWrongIndex: number | undefined;
  highlightedCorrectIndex: number | undefined;
  onBlockClick: (index: number, correctIndex: number) => void;
}

export default function ColorBlocks({
  blocks,
  correctIndex,
  highlightedWrongIndex,
  highlightedCorrectIndex,
  onBlockClick,
}: ColorBlocksProps) {
  return (
    <div className="grid grid-cols-3 place-items-center gap-4.5">
      {blocks.map((color, index) => (
        <button
          // eslint-disable-next-line @eslint-react/no-array-index-key
          key={`${color}-${index}`}
          style={{ backgroundColor: color }}
          type="button"
          onClick={() => onBlockClick(index, correctIndex)}
          className={cn(
            'w-[85px] h-[85px] mobile:w-[100px] mobile:h-[100px] transition-all duration-200 rounded-lg cursor-pointer',
            highlightedWrongIndex === index && 'outline-4 outline-advent-2',
            highlightedCorrectIndex === index && 'outline-4 outline-white/80',
          )}
        />
      ))}
    </div>
  );
}
