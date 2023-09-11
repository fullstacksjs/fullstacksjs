interface Props {
  children: React.ReactNode;
}

export const RuleSet = ({ children }: Props) => {
  return <ol className="ms-4">{children}</ol>;
};
