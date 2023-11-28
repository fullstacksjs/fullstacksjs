import { Navs } from './Navs';

export const DesktopNavs = () => {
  return (
    <ul className="hidden gap-8 text-md font-bold leading-tight tablet:gap-8 desktop:inline-flex">
      <Navs />
    </ul>
  );
};
