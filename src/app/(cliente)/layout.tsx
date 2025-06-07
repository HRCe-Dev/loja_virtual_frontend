'use client';
import MenuLateral from "./MenuLateral";
import { useState } from "react";
import { ChevronRight } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mostrarMenu, setMostrarMenu] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 relative">

      {/* Fundo escuro ao abrir o menu (mobile) */}
      {mostrarMenu && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setMostrarMenu(false)}
        />
      )}

      {/* Botão para abrir menu no mobile */}
      <button
        onClick={() => setMostrarMenu(true)}
        className="md:hidden fixed top-1/2 left-0 z-50 bg-gray-400 text-white p-2 rounded-r-full shadow-lg transform -translate-y-1/2"
      >
        <ChevronRight size={20} />
      </button>

      <div className="md:hidden">
        <MenuLateral isOpen={mostrarMenu} />
      </div>

      {/* Menu lateral fixo no desktop, mas dentro do fluxo da página */}
      <div className="hidden md:block w-64 shrink-0">
        {/* Se quiser que só o menu role separadamente, adicione h-screen + overflow-y-auto */}
        <div className="sticky top-4">
          <MenuLateral isOpen={true} />
        </div>
      </div>

      {/* Conteúdo principal com scroll, sem sobreposição */}
      <main className="flex-1 overflow-auto z-10">
        {children}
      </main>
    </div>
  );
}
