import Logo from './Logo.svg';

interface Props {
  title: React.ReactNode;
  cta: React.JSX.Element;
  sub?: string;
}

export const Banner = ({ title, cta, sub }: Props) => {
  return (
    <header className="flex flex-col items-center justify-between gap-12 desktop:flex-row">
      <div className="flex flex-col items-center gap-16 desktop:items-start">
        <div className="flex flex-col items-center gap-2 desktop:items-start">
          <h1 className="text-center text-4xl/tight font-bold tablet:text-start desktop:text-5xl">
            {title}
          </h1>
          <p className="text-sm text-fg-1 uppercase desktop:text-md">{sub}</p>
        </div>
        {cta}
      </div>
      <Logo className="-order-1 w-md desktop:order-0 desktop:w-160 wide:w-188" />
    </header>
  );
};
