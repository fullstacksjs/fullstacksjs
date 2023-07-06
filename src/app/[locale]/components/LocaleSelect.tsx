'use client';
import * as Dropdown from '@radix-ui/react-dropdown-menu';
import { usePathname } from 'next-intl/client';
import Link from 'next-intl/link';

import SecondaryButton from '@/components/SecondaryButton';
import type { Locales } from '@/i18n';

import ChevronDownIcon from './ChevronDown.svg';
import ENFlag from './EN.svg';
import IRFlag from './IR.svg';

const localeMap: Record<Locales, { icon: JSX.Element; label: string }> = {
  fa: { icon: <IRFlag />, label: 'FA' },
  en: { icon: <ENFlag />, label: 'EN' },
};

export const LocaleSelect = ({ locale }: { locale: Locales }) => {
  const otherLocale = locale === 'en' ? 'fa' : 'en';
  const { icon, label } = localeMap[locale];
  const { icon: otherIcon, label: otherLabel } = localeMap[otherLocale];
  const pathname = usePathname();

  return (
    <Dropdown.Root>
      <Dropdown.Trigger
        tabIndex={-1}
        dir="ltr"
        className="flex h-[53px] w-[100px] select-none items-center justify-between rounded-xl bg-bg-muted px-4 text-xsm font-bold capitalize leading-tight text-fg-0 outline-none hover:cursor-pointer hover:bg-bg-1 hover:text-accent-0 focus:bg-bg-1 focus:text-accent-0 focus:outline data-[state=open]:rounded-b-none"
        aria-label="Locale"
      >
        <div className="flex items-center gap-4">
          {icon}
          {label}
        </div>
        <ChevronDownIcon />
      </Dropdown.Trigger>
      <Dropdown.Portal>
        <Dropdown.Content className="relative z-50 overflow-hidden rounded-b-md bg-bg-muted data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2">
          <Dropdown.Item asChild>
            <Link
              className="relative flex h-[53px] w-[100px] select-none items-center gap-4 rounded-b-xl bg-transparent px-4 text-xsm font-bold capitalize leading-tight text-fg-0 outline-none hover:cursor-pointer hover:bg-bg-1 hover:text-accent-0 focus:bg-bg-1 focus:text-accent-0 focus:outline"
              locale={otherLocale}
              href={pathname}
            >
              {otherIcon}
              {otherLabel}
            </Link>
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Portal>
    </Dropdown.Root>
  );
};
