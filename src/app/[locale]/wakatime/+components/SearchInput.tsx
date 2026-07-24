import SearchIcon from '@/components/Icons/Search.svg';

interface Props {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  label?: string;
}

export function SearchInput({ onChange, value, label }: Props) {
  return (
    <div className="relative w-full max-w-96">
      <SearchIcon className="pointer-events-none absolute inset-s-7 top-1/2 size-10 -translate-y-1/2 text-fg-1" />
      <input
        aria-label={label}
        className="w-full rounded-lg border border-border bg-bg-raised py-6 ps-22 pe-6 text-sm text-fg-0 outline-none placeholder:text-fg-1 focus:border-accent-0"
        onChange={onChange}
        placeholder={label}
        type="search"
        value={value}
      />
    </div>
  );
}
