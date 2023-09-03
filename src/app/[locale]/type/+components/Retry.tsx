import { useAtom } from 'jotai';

import { cn } from '@/utils/cn';

import { handleReset } from '../atoms';
import { audios } from '../audio';

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

export const Retry = ({ className, onClick, ...props }: Props) => {
  const [, reset] = useAtom(handleReset);
  return (
    <button
      onClick={(e) => {
        audios.restart.play();
        reset();
        onClick?.(e);
      }}
      {...props}
    >
      <svg
        className={cn(
          'm-0 w-10 fill-none cursor-pointer stroke-current',
          className,
        )}
        viewBox="0 0 40 40"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M1.6666 6.87006V16.8701H11.6666" />
        <path d="M38.3333 33.5366V23.5366H28.3333" />
        <path d="M34.1499 15.2027C33.3047 12.814 31.868 10.6784 29.9742 8.99509C28.0803 7.31178 25.7908 6.13566 23.3195 5.57649C20.8481 5.01731 18.2753 5.09329 15.8413 5.79734C13.4072 6.5014 11.1912 7.81058 9.39993 9.60272L1.6666 16.8694M38.3333 23.5361L30.5999 30.8027C28.8087 32.5949 26.5926 33.904 24.1586 34.6081C21.7245 35.3122 19.1518 35.3881 16.6804 34.829C14.209 34.2698 11.9196 33.0937 10.0257 31.4104C8.13182 29.727 6.69521 27.5914 5.84993 25.2027" />
      </svg>
    </button>
  );
};
