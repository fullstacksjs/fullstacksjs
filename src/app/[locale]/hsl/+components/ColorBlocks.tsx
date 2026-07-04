import { cn } from '@/utils/cn';

interface ColorBlocksProps {
  blocks: string[];
  highlightedWrongIndex: number | undefined;
  highlightedCorrectIndex: number | undefined;
  onBlockClick: (index: number) => void;
}

export function ColorBlocks({
  blocks,
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
          onClick={() => onBlockClick(index)}
          className={cn(
            'size-[85px] cursor-pointer rounded-lg transition-all duration-200 mobile:size-[100px]',
            highlightedWrongIndex === index && 'outline-4 outline-accent-0',
            highlightedCorrectIndex === index && 'outline-4 outline-white/80',
          )}
        />
      ))}
    </div>
  );
}
