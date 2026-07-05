export default function ContentLayout({ children }: LayoutProps<'/[locale]'>) {
  return (
    <div className="container flex w-full flex-1 flex-col gap-24 pt-24 pb-8 text-base mobile:gap-44 desktop:pb-40">
      {children}
    </div>
  );
}
