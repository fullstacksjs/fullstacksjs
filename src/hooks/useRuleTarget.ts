import { isNull } from '@fullstacksjs/toolbox';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { usePathname, useRouter } from '@/navigation';

function useFocused() {
  const search = useSearchParams();
  const focus = search.get('focus');
  return focus;
}

export function useScrollToFocused() {
  const focused = useFocused();

  useEffect(() => {
    if (!focused) return;
    document
      .getElementById(focused)
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [focused]);
}

export function useFocusState(target: string) {
  const focused = useFocused();

  if (isNull(focused)) return 'idle';
  if (focused === target) return 'focused';
  return 'faded';
}

export function useHandleFocusItem(item: string) {
  const router = useRouter();
  const pathname = usePathname();
  const focused = useFocused();

  const focus = () => {
    if (item === focused) router.push(pathname, { scroll: false });
    else router.push(`${pathname}?focus=${item}`, { scroll: false });
  };

  return focus;
}
