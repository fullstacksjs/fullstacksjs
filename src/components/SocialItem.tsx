interface Props {
  href: string;
  children: React.ReactNode;
}

export const SocialItem = ({ children, href }: Props): React.JSX.Element => {
  return (
    <a
      className="flex items-center gap-2 transition-colors hover:text-accent-0"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      {children}
    </a>
  );
};
