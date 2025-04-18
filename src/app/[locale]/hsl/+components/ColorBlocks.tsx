import { cn } from '@/utils/cn';
import React from 'react';

interface ColorBlocksProps {
  blocks: string[];
  correctIndex: number;
  wrongSelectedIndex: number | null;
  onBlockClick: (index: number, isCorrect: boolean) => void;
}

export default function ColorBlocks({
  blocks,
  correctIndex,
  wrongSelectedIndex,
  onBlockClick,
}: ColorBlocksProps) {
  return (
    <div className="grid grid-cols-3 gap-4.5">
      {blocks.map((color, index) => (
        <button
          // eslint-disable-next-line @eslint-react/no-array-index-key
          key={`${color}-${index}`}
          style={{ backgroundColor: color }}
          type="button"
          onClick={() => onBlockClick(index, index === correctIndex)}
          className={cn(
            'w-[80px] h-[80px] mobile:w-[100px] mobile:h-[100px] rounded-lg ',
            wrongSelectedIndex === index && 'outline-6 outline-advent-2',
          )}
        />
      ))}
    </div>
  );
}
