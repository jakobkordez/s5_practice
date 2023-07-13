interface SubHeaderProps {
  title: string;
  children: React.ReactNode;
}

export function SubHeader({ title, children }: SubHeaderProps) {
  return (
    <div className="border-t-2 border-primary bg-dark text-light">
      <div className="container flex flex-col gap-6 py-8">
        <h1 className="text-3xl font-semibold">{title}</h1>

        {children}
      </div>
    </div>
  );
}
