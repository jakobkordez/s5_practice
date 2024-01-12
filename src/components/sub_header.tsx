interface SubHeaderProps {
  children: React.ReactNode;
}

export function SubHeader({ children }: SubHeaderProps) {
  return (
    <div className="border-t-2 border-primary bg-dark">
      <div className="section container prose prose-invert">{children}</div>
    </div>
  );
}
