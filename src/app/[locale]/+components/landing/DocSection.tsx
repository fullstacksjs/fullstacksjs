import clsx from 'clsx';

interface Props {
  id: string;
  title: string;
  sunken?: boolean;
  children: React.ReactNode;
  comment: string;
}

export const DocSection = ({ id, title, sunken, children, comment }: Props) => (
  <section
    id={id}
    className={clsx('border-t border-border py-24', sunken && 'bg-bg-darker')}
  >
    <div className="container flex flex-col items-start gap-x-20 gap-y-4 text-balance desktop:grid desktop:grid-cols-[240px_1fr] desktop:grid-rows-[auto_1fr]">
      <div className="font-mono text-base tracking-wide whitespace-nowrap text-fg-1">
        {`// ${comment}`}
      </div>
      <h2 className="row-start-2 text-3xl/tight font-semibold tracking-tight">
        {title}
      </h2>
      <div className="row-start-2">{children}</div>
    </div>
  </section>
);

export const DocSectionText = ({ children }: { children: React.ReactNode }) => (
  <p className="text-md text-fg-1">{children}</p>
);
