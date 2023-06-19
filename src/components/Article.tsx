interface Props {
  children: React.ReactNode;
  title: string;
  id?: string;
}

export const Article = ({ children, id, title }: Props) => {
  return (
    <article className="flex w-full flex-col gap-8">
      <h2 id={id} className="text-2xl font-bold">
        {title}
      </h2>

      {children}
    </article>
  );
};
