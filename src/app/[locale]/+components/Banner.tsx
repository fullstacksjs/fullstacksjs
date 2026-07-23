import Logo from './Logo.svg';

interface Props {
  title: React.ReactNode;
  cta: React.JSX.Element;
  sub?: string;
}

export const Banner = ({ title, cta, sub }: Props) => {
  return (
    <header className="container flex flex-col items-center justify-between gap-16 py-24 text-center desktop:flex-row desktop:text-start">
      <div>
        <h1 className="text-4xl/none font-bold tracking-tight desktop:text-5xl/none">
          {title}
        </h1>
        {sub && (
          <div className="mb-10 inline-flex items-center gap-4">
            <span className="hidden h-1 w-8 bg-current desktop:inline-block" />
            <p className="text-xl font-semibold tracking-tight lowercase">
              {sub}
            </p>
          </div>
        )}
        <div className="flex justify-center desktop:justify-start">{cta}</div>
      </div>
      <Logo className="-order-1 mx-auto w-100 transition-all desktop:order-0 desktop:mx-0 desktop:w-130 wide:w-160" />
    </header>
  );
};
