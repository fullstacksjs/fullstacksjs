export default function Layout({
  modal,
  children,
}: LayoutProps & { modal: React.ReactNode }) {
  return (
    <>
      {modal}
      {children}
    </>
  );
}
