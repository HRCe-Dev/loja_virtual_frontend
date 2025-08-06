"use client";

import { X, ChevronRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Categoria } from "@/types/Produto";
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  categorias: Categoria[];
}

//TODO: colocar animacao para abrir, talvez colocar como hidden

//TODO: colocar hover para telas touchscreen para expandir categorias

export default function MobileSidebar({
  isOpen,
  onClose,
  categorias,
}: SidebarProps) {
  const [hoverCategoria, setHoverCategoria] = useState<string | null>(null);

  const servicos = [
    {
      nome: "HRCe Contabilidade",
      href: "https://hrcelda.com/",
    },
    {
      nome: "HRCe Tecnologia",
      href: "/https://hrcelda.com/tecnologia/",
    },
  ];

  return (
    <>
      {/* Fundo escuro */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-[90] transition-opacity"
        />
      )}

      {/* Menu lateral */}
      <aside
        className={`fixed top-0 left-0 h-full w-4/5 max-w-xs z-[100] shadow-md transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white flex flex-col`}
      >
        {/* Topo laranja com logo e botão fechar */}
        <div className="bg-[#FF7700] flex flex-col items-center justify-between px-4 py-4">
          <button
            onClick={onClose}
            aria-label="Fechar menu"
            className="absolute top-2 left-2"
          >
            <X size={28} className="text-white" />
          </button>
          <div className="h-5 w-2"></div>
          <Link href="/" onClick={onClose} className="flex items-center">
            <Image
              src="/HRC_Azul.svg"
              alt="Logo HRCe"
              width={120}
              height={40}
              className="h-auto w-auto object-contain"
              priority
            />
          </Link>
          <button
            onClick={onClose}
            aria-label="Fechar menu"
            className="absolute top-2 left-2"
          >
            <X size={28} className="text-white" />
          </button>
        </div>

        {/* Navegação principal */}
        <nav className="flex-1 px-4 py-4 text-[#265674] font-medium text-base space-y-2 overflow-y-auto">
          <div className="space-y-2 sm:hidden">
            <Link
              href="/"
              onClick={onClose}
              className="block hover:text-[#FF7700]"
            >
              Home
            </Link>
            <Link
              href="/#"
              onClick={onClose}
              className="block hover:text-[#FF7700]"
            >
              Super Ofertas
            </Link>
            <Link
              href="/blog"
              onClick={onClose}
              className="block hover:text-[#FF7700]"
            >
              Blog
            </Link>
            <Link
              href="/contacto"
              onClick={onClose}
              className="block hover:text-[#FF7700]"
            >
              Contacto
            </Link>
            <Link
              href="/sobrenos"
              onClick={onClose}
              className="block hover:text-[#FF7700]"
            >
              Sobre nós
            </Link>
          </div>
          <h2 className="font-bold text-xl text-gray-800 max-sm:hidden text-center">
            Categorias
          </h2>
          <hr className="my-4 border-gray-300" />
          <h2 className="font-bold text-xl text-gray-900 sm:hidden ">
            Categorias
          </h2>

          <>
            {/* Categoria com hover (subcategorias visíveis) */}
            {categorias.map((cat, i) => (
              <div
                key={i}
                className="relative"
                onMouseEnter={() => setHoverCategoria(cat.nome)}
                onMouseLeave={() => setHoverCategoria(null)}
              >
                <div className="flex items-center justify-between hover:text-[#FF7700]">
                  <Link
                    className="flex items-center justify-between"
                    href={`/categoria/${cat.id}`}
                  >
                    <span>{cat.nome}</span>
                    {hoverCategoria === cat.nome ? (
                      <ChevronDown size={18} />
                    ) : (
                      <ChevronRight size={18} />
                    )}
                  </Link>
                </div>
                {hoverCategoria === cat.nome && (
                  <div className="pl-4 mt-2 space-y-1 text-sm text-gray-600">
                    {cat.subcategorias &&
                      cat.subcategorias.map((sub, idx) => (
                        <div
                          key={idx}
                          onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            e.preventDefault();
                            onClose();
                          }}
                        >
                          <Link
                            href={`/categoria/${cat.id}/${sub.id}`}
                            className="block hover:text-[#FF7700]"
                          >
                            {sub.nome}
                          </Link>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            ))}
          </>

          <hr className="my-4 border-gray-300" />
          <div className="text-[#265674] space-y-2 sm:hidden">
            <span className="font-semibold text-sm uppercase text-gray-500">
              Serviços
            </span>
            {servicos.map((serv, idx) => (
              <Link
                key={idx}
                href={serv.href}
                onClick={onClose}
                className="block hover:text-[#FF7700]"
              >
                {serv.nome}
              </Link>
            ))}
          </div>
        </nav>
      </aside>
    </>
  );
}
