import React from "react";
import Link from "next/link";

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-[1200px] w-full px-4 md:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Button({
  children,
  href,
  onClick,
  type = "button",
  className = "",
  variant = "primary",
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  variant?: "primary" | "secondary" | "outline";
}) {
  const baseStyles = "inline-flex items-center justify-center px-8 py-3.5 md:px-10 md:py-4 rounded-full font-semibold text-sm md:text-base tracking-wide uppercase transition-all duration-300 transform hover:-translate-y-1 text-center";
  
  const variants = {
    primary: "bg-[var(--ternary)] text-white hover:bg-orange-600 hover:shadow-[0_10px_20px_rgba(242,110,33,0.3)]",
    secondary: "bg-[var(--secondary)] text-white hover:bg-gray-800",
    outline: "border-2 border-[var(--ternary)] text-[var(--ternary)] hover:bg-[var(--ternary)] hover:text-white",
  };

  const styles = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={styles} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={styles} onClick={onClick}>
      {children}
    </button>
  );
}
