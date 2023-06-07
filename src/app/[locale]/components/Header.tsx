import { Authentication } from '@/components/Authentication';

import Navs from './Navs';

export default function Header(): React.JSX.Element {
  return (
    <div className="flex items-center justify-between">
      <Navs />
      <div className="flex items-center gap-16">
        <Authentication />
      </div>
    </div>
  );
}
