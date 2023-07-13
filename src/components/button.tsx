import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function Button({
  children,
  className,
  onClick,
  disabled,
}: ButtonProps) {
  className ??= '';

  return (
    <button
      className={`flex flex-row items-center justify-center rounded-lg bg-primary px-5 py-2 font-semibold text-white shadow-lg transition-colors hover:bg-primary-dark active:bg-primary-darker disabled:opacity-70 ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

interface LinkButtonProps {
  children: React.ReactNode;
  className?: string;
  href: string;
}

export function LinkButton({ children, className, href }: LinkButtonProps) {
  className ??= '';

  return (
    <Link
      className={`flex flex-row items-center justify-center rounded-lg bg-primary px-5 py-2 font-semibold text-white shadow-lg transition-colors hover:bg-primary-dark active:bg-primary-darker disabled:opacity-70 ${className}`}
      href={href}
    >
      {children}
    </Link>
  );
}
