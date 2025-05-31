'use client';
import MenuLateral from "./MenuLateral";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <MenuLateral isOpen />
      <main className="flex-1 bg-gray-100 p-4 overflow-auto">
        {children}
      </main>
    </div>
  );
}