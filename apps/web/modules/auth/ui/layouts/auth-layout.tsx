import React from "react";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen min-w-screen items-center justify-center">
      {children}
    </div>
  );
}

