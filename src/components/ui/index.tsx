import React from "react";

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
