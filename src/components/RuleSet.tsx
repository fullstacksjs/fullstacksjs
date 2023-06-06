interface Props {
  children: React.ReactNode;
}

export const RuleSet = ({ children }: Props): React.JSX.Element => {
  return <ul className="ms-4">{children}</ul>;
};
