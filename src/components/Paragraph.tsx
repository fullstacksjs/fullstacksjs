interface Props {
  children: React.ReactNode;
}

export const Paragraph = ({ children }: Props) => {
  return <p className="text-paragraph text-light-1">{children}</p>;
};
