export default function Layout({
  modal,
  children,
}: LayoutProps<'/[locale]/events'>) {
  return (
    <div className="font-fa">
      {modal}
      {children}
    </div>
  );
}
