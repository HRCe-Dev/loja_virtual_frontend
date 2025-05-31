'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  ShoppingCart,
  Heart,
  MapPin,
  User,
  LogOut,
} from 'lucide-react';

export default function MenuLateral({ isOpen = false }: { isOpen?: boolean }) {
  const pathname = usePathname();

  const links = [
    { href: '/historico', label: 'Histórico de Compras', icon: <ShoppingCart size={18} /> },
    { href: '/listadesejo', label: 'Lista de desejo', icon: <Heart size={18} /> },
    { href: '/carrinho', label: 'Carrinho de compras', icon: <ShoppingCart size={18} /> },
    { href: '/entrega', label: 'Dados de entrega', icon: <MapPin size={18} /> },
    { href: '/perfil', label: 'Meu perfil', icon: <User size={18} /> },
  ];

  return (
    <aside
      className={`
        fixed z-40 top-0 left-0 h-full w-1/5 bg-white shadow-lg transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:static md:translate-x-0 md:block md:h-[calc(100vh-8rem)] md:rounded-2xl md:mt-4 md:ml-4 
      `}
    >
      {/* Perfil */}
      <div className="p-6 flex flex-col items-center border-b">
        <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-2">
          <span className="text-xl font-bold text-blue-500">N</span>
        </div>
        <h2 className="font-semibold">Gabriel Luz</h2>
        <p className="text-sm text-gray-500">g.luz03@gmail.com</p>
      </div>

      {/* Navegação */}
      <nav className="flex flex-col my-6 px-4 gap-2 border-b ">
        {links.map(({ href, label, icon }) => (
          <Link
            key={href}
            href={href}
            className={`
              flex items-center gap-2 py-2 px-4 rounded-md transition
              ${pathname === href
                ? 'bg-orange-500 text-white'
                : 'hover:bg-gray-100 text-gray-800'}
            `}
          >
            {icon}
            {label}
          </Link>
        ))}
      </nav>

      {/* Sair */}
      <div className="mt-auto px-4 items-center flex justify-center">
        <button className="text-red-500 hover:underline flex items-center gap-2">
          <LogOut size={18} /> Sair
        </button>
      </div>
    </aside>
  );
}
