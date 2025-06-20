'use client';
import MenuLateral from "../../componentes/MenuLateral";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100 relative">

      {/* Menu lateral fixo apenas no desktop */}
      <div className="hidden md:block w-64 shrink-0">
        <div className="sticky top-4">
          <MenuLateral isOpen={true} />
        </div>
      </div>

      {/* Conteúdo principal */}
      <main className="flex-1 overflow-auto z-10 p-6">
        {children}
      </main>
    </div>
  );
}