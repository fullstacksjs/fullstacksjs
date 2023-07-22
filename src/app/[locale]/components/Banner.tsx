import Logo from './Logo.svg';

interface Props {
  title: string;
  cta: JSX.Element;
  sub?: string;
}

export const Banner = ({ title, cta, sub }: Props) => {
  return (
    <header className="flex flex-col items-center justify-between gap-12 desktop:flex-row">
      <div className="flex flex-col items-center gap-16 desktop:items-start">
        <div className="flex flex-col items-center gap-2 desktop:items-start">
          <h1 className="text-4xl font-bold leading-tight desktop:text-5xl">
            {title}
          </h1>
          <p className="text-sm uppercase text-fg-1 desktop:text-md">{sub}</p>
        </div>
        {cta}
      </div>
      <Logo className="-order-1 w-[28rem] desktop:order-none desktop:w-[40rem] wide:w-[47rem]" />
    </header>
  );
};
