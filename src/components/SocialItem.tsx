interface Props {
  href: string;
  children: React.ReactNode;
}

export const SocialItem = ({ children, href }: Props): React.JSX.Element => {
  return (
    <a
      className="flex items-center gap-2 transition-colors hover:text-accent-0"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
};
