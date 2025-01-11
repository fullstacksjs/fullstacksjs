export default function Layout({
  modal,
  children,
}: LayoutProps & { modal: React.ReactNode }) {
  return (
    <div className="font-fa">
      {modal}
      {children}
    </div>
  );
}
