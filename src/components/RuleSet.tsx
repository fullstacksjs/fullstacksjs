interface Props {
  children: React.ReactNode;
}

export const RuleSet = ({ children }: Props) => {
  return <ul className="ms-4">{children}</ul>;
};
