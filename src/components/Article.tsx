interface Props {
  children: React.ReactNode;
  title: React.ReactElement | string;
  id?: string;
}

export const Article = ({ children, id, title }: Props) => {
  return (
    <article className="flex w-full flex-col gap-8">
      <h2 id={id} className="text-xl font-bold">
        {title}
      </h2>

      {children}
    </article>
  );
};
