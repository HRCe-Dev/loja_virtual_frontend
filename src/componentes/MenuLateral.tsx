"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ShoppingCart, Heart, MapPin, User, LogOut } from "lucide-react";
import { logout, obterDadosUser, UserType } from "@/api/auth";
import { useState } from "react";

export default function MenuLateral({ isOpen = false }: { isOpen?: boolean }) {
  const [user, setUser] = useState<UserType | null>(obterDadosUser());
  const pathname = usePathname();

  const links = [
    {
      href: "/historico",
      label: "Histórico de Compras",
      icon: <ShoppingCart size={18} />,
    },
    {
      href: "/listadesejo",
      label: "Lista de desejo",
      icon: <Heart size={18} />,
    },
    {
      href: "/carrinho",
      label: "Carrinho de compras",
      icon: <ShoppingCart size={18} />,
    },
    {
      href: "/dadosentrega",
      label: "Dados de entrega",
      icon: <MapPin size={18} />,
    },
    { href: "/perfil", label: "Meu perfil", icon: <User size={18} /> },
  ];

  return (
    <aside
      className={`
        fixed top-0 left-0 h-full w-2/3 md:w-64 bg-white shadow-lg z-40 overflow-y-auto
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:block
      `}
    >
      {/* Perfil */}
      {user && (
        <div className="p-6 flex flex-col items-center border-b">
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-2">
            <span className="text-xl font-bold text-blue-500">
              {user.nome[0]}
            </span>
          </div>

          <>
            <h2 className="font-semibold text-gray-800">{user.nome}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
          </>
        </div>
      )}
      {/* Navegação */}
      <nav className="flex flex-col my-6 px-4 gap-2 border-b">
        {links.map(({ href, label, icon }) => (
          <Link
            key={href}
            href={href}
            className={`
              flex items-center gap-2 py-2 px-4 rounded-md transition
              ${
                pathname === href
                  ? "bg-[#FF7700] text-white"
                  : "hover:bg-gray-100 text-gray-800"
              }
            `}
          >
            {icon}
            {label}
          </Link>
        ))}
      </nav>
      , User: User_
      {/* Sair */}
      <div className="mt-auto px-4 flex justify-center pb-6">
        <button
          onClick={() => logout()}
          className="text-red-500 hover:underline flex items-center gap-2"
        >
          <LogOut size={18} /> Sair
        </button>
      </div>
    </aside>
  );
}
