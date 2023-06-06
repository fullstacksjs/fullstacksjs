interface Props {
  children: React.ReactNode;
}

export const Highlight = ({ children }: Props): React.JSX.Element => {
  return <strong className="text-accent-0">{children}</strong>;
};
