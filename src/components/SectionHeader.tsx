interface Props {
  id?: string;
  children: React.ReactNode;
}

export default function SectionHeader({ id, children }: Props) {
  return (
    <h2 id={id} className="text-2xl font-bold">
      {children}
    </h2>
  );
}
