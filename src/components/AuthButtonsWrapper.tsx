import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

function AuthButtonsWrapper({ onClick, children, className = '' }: Props) {
  return (
    <button
      type="button"
      className={`flex items-center gap-6 rounded-xl bg-bg-muted p-4 text-xsm font-semibold capitalize leading-[2rem] text-fg-0 hover:cursor-pointer focus:outline ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default AuthButtonsWrapper;
