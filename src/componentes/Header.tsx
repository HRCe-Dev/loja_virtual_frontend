'use client';
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingCart, Menu, User, MapPin } from "lucide-react";

const categorias = [
  "Categoria",
  "Vestuarios",
  "Eletrônicos",
  "Beleza",
  "Calçado",
  "Mais",
];

const Header = () => {
  return (
    <header className="w-full">
      {/* Top Orange Bar */}
      <div className="bg-[#FF7700] w-full px-4 sm:px-6 lg:px-16 py-2 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center w-full md:w-auto justify-between">
          <Link href="/">
            <Image
              src="\HRC - Branca.svg"
              alt="Logo HRC"
              width={120}
              height={40}
              className="h-auto"
            />
          </Link>

          {/* Mobile Icons */}
          <div className="flex md:hidden gap-3">
            <User className="text-white" />
            <ShoppingCart className="text-white" />
            <Menu className="text-white" />
          </div>
        </div>

        {/* Search bar */}
        <div className="w-full md:w-2/5 lg:w-1/3 flex">
          <div className="flex items-center bg-white rounded-l-lg px-3 py-2 shadow-s w-full">
            <input
              type="text"
              placeholder="Procura aqui seu produto"
              className="w-full outline-none text-sm text-gray-700"
            />
          </div>
          <div className="flex items-center bg-[#043873] rounded-e-lg px:3 py-2 shadow-sm w-1/5">
            <button className="flex items-center justify-center w-full h-full">
              <Search className="text-white" size={22} />
            </button>
          </div>
        </div>

        {/* Right section desktop only */}
        <div className="hidden md:flex items-center gap-4">
          {/* Select ilhas */}
          <select className="bg-white text-sm px-2 py-1 rounded-md">
            <option value="sv">Santiago</option>
            <option value="sa">Santo Antão</option>
            <option value="sn">São Nicolau</option>
            <option value="bv">Boa Vista</option>
          </select>

          <Link href="/login" className="text-white text-sm hover:underline">
            Register/Login
          </Link>

          <Link href="/carrinho">
            <ShoppingCart className="text-white" />
          </Link>
        </div>
      </div>

      {/* Bottom Category Menu */}
      <div className="bg-[#043873] text-white">
        {/* Categorias - apenas desktop */}
        <div className="hidden md:flex items-center justify-center gap-8 lg:gap-20 text-md font-medium px-4 sm:px-6 lg:px-10 py-1 max-w-7xl mx-auto">
          {categorias.map((cat, i) => (
            <button
              key={i}
              className={`hover:text-orange-400 transition-colors ${
                i === 0 && "font-bold"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Mobile: cidade + menu */}
        <div className="md:hidden w-full flex items-center justify-between text-sm px-4 py-2">
          <span className="flex items-center gap-1">
            <MapPin className="text-white w-4 h-4" />
            Santiago
          </span>

          <Menu className="text-white" />
        </div>
      </div>
    </header>
  );
};

export default Header;
