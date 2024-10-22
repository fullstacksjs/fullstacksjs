interface Props {
  children: React.ReactNode;
  title: React.ReactNode;
  id?: string;
}

export const Article = ({ children, id, title }: Props) => {
  return (
    <article className="flex w-full flex-col gap-8">
      <h2 className="text-xl font-bold" id={id}>
        {title}
      </h2>

      {children}
    </article>
  );
};
