interface SubHeaderProps {
  title: string;
  children: React.ReactNode;
}

export function SubHeader({ title, children }: SubHeaderProps) {
  return (
    <div className="border-t-2 border-primary bg-dark text-light">
      <div className="section container flex flex-col gap-6">
        <h1 className="text-2xl font-semibold sm:text-3xl">{title}</h1>

        {children}
      </div>
    </div>
  );
}
