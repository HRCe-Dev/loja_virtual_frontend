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
        className="md:hidden fixed top-1/2 left-0 z-50 bg-gray-400 text-white py-18 rounded-r-full shadow-lg transform -translate-y-1/2"
      >
        <ChevronRight size={20} />
      </button>

      {/* Menu lateral responsivo */}
      <MenuLateral isOpen={mostrarMenu} />

      {/* Conteúdo principal */}
      <main className="flex-1 p-4 overflow-auto z-10">
        {children}
      </main>
    </div>

  );
}