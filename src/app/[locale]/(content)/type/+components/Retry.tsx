import { useAtom } from 'jotai';

import { audios } from '@/components/Audio';
import { IconButton } from '@/components/IconButton';

import { handleReset } from '../atoms';
import Refresh from './Refresh.svg';

interface Props extends React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> {}

export const Retry = ({ className, onClick, ...props }: Props) => {
  const [, reset] = useAtom(handleReset);

  return (
    <IconButton
      type="button"
      aria-label="Retry"
      onClick={(e) => {
        audios.restart.play();
        reset();
        onClick?.(e);
      }}
      {...props}
    >
      <Refresh aria-hidden="true" className="size-12" />
    </IconButton>
  );
};
