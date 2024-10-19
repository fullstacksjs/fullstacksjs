interface Props {
  id?: string;
  children: React.ReactNode;
}

export default function SectionHeader({ id, children }: Props) {
  return (
    <h2 className="text-2xl font-bold" id={id}>
      {children}
    </h2>
  );
}
