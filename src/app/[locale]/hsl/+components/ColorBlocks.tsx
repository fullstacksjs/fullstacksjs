import { cn } from '@/utils/cn';
import React from 'react';

interface ColorBlocksProps {
  blocks: string[];
  correctIndex: number;
  wrongSelectedIndex: number | undefined;
  showCorrectIndex: number | undefined;
  onBlockClick: (
    index: number,
    correctIndex: number,
    isCorrect: boolean,
  ) => void;
}

export default function ColorBlocks({
  blocks,
  correctIndex,
  wrongSelectedIndex,
  showCorrectIndex,
  onBlockClick,
}: ColorBlocksProps) {
  console.log(showCorrectIndex);

  return (
    <div className="grid grid-cols-3 gap-4.5">
      {blocks.map((color, index) => (
        <button
          // eslint-disable-next-line @eslint-react/no-array-index-key
          key={`${color}-${index}`}
          style={{ backgroundColor: color }}
          type="button"
          onClick={() =>
            onBlockClick(index, correctIndex, index === correctIndex)
          }
          className={cn(
            'w-[85px] h-[85px] mobile:w-[100px] mobile:h-[100px] transition-all duration-200 rounded-lg ',
            wrongSelectedIndex === index && 'outline-4 outline-advent-2',
            showCorrectIndex === index && 'outline-4 outline-white/80',
          )}
        />
      ))}
    </div>
  );
}
