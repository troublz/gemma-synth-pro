import { type ReactNode } from 'react';
export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-neutral-950 text-neutral-100 flex flex-col">
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
}
