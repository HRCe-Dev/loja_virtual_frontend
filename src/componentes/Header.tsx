"use client";
import Link from "next/link";
import Image from "next/image";
import { useObterIlhas } from "@/api/localizacao.api";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthLinks from "./VerificaAuth";
import {
  Search,
  ShoppingCart,
  Menu,
  User,
  MapPin,
  ChevronDown,
} from "lucide-react";

const categorias = [
  "Categoria",
  "Vestuarios",
  "Eletrônicos",
  "Beleza",
  "Calçado",
  "Mais",
];

const Header = () => {
  const [ilhas, setIlhas] = useState<string[]>([]);
  useObterIlhas(setIlhas);

  const [menuOpen, setMenuOpen] = useState(false);
  const [ilhasOpen, setIlhasOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const ilhasRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();
  const [termoBusca, setTermoBusca] = useState('');

  

  // Fecha menus ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      const clickedOutsideMenu =
        menuRef.current && !menuRef.current.contains(target);
      const clickedOutsideIlhas =
        ilhasRef.current && !ilhasRef.current.contains(target);

      if (menuOpen && clickedOutsideMenu) {
        setMenuOpen(false);
      }
      if (ilhasOpen && clickedOutsideIlhas) {
        setIlhasOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen, ilhasOpen]);

  // Toggle menus com exclusividade
  /* const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    setIlhasOpen(false);
  };*/

  /*
  const toggleIlhas = () => {
    setIlhasOpen((prev) => !prev);
    setMenuOpen(false);
  };*/

  return (
    <header className="w-full fixed top-0 left-0 right-0 z-50">
      {/* Top Orange Bar */}
      <div className="bg-[#FF7700] w-full px-4 sm:px-6 lg:px-16 py-2 md:py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center w-full md:w-auto justify-between">
          <Link href="/">
            <Image
              src="\HRC_Azul.svg"
              alt="Logo HRC"
              width={140}
              height={40}
              className="h-auto"
            />
          </Link>

          {/* Mobile Icons */}
          <div className="flex md:hidden gap-3 relative">
            <Link href="/login">
              <User className="text-white" />
            </Link>
            <Link href="/carrinho">
              <ShoppingCart className="text-white" />
            </Link>
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <Menu className="text-white" />
            </button>
          </div>
        </div>

        {/* Search bar */}
        <div className="w-full flex md:px-10">
          <div className="flex items-center bg-white rounded-l-lg px-3  py-2 shadow-s md:w-9/10 w-full">
            <input
            type="text"
            placeholder="Procura aqui seu produto"
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && termoBusca.trim()) {
                router.push(`/busca?termo=${encodeURIComponent(termoBusca)}`);
              }
            }}
            className="w-full outline-none text-sm text-gray-700"
          />
          </div>
          <div className="flex items-center bg-[#265674] rounded-e-lg px-5 md:px-3 py-3 shadow-sm md:w-1/10">
            <button
              onClick={() => {
                if (termoBusca.trim()) {
                  router.push(`/busca?termo=${encodeURIComponent(termoBusca)}`);
                }
              }}
              className="flex items-center justify-center w-full h-full"
            >
              <Search className="text-white" size={22} />
            </button>
          </div>
        </div>

        {/* Right section desktop only */}
        <div className="hidden md:flex items-center gap-4">
          {/* Select ilhas */}
          <select className="bg-white text-sm px-2 py-1 rounded-md">
            <option value="">Selecione a ilha</option>
            {ilhas.map((ilha) => (
              <option key={ilha} value={ilha}>
                {ilha}
              </option>
            ))}
          </select>

          <div className="text-white text-sm hover:underline">
            <AuthLinks />
          </div>

          <Link href="/carrinho">
            <ShoppingCart className="text-white" />
          </Link>
        </div>
      </div>

      {/* Bottom Category Menu */}
      <div className="bg-[#265674] text-white">
        {/* Categorias - apenas desktop */}
        <div className="hidden md:flex items-center justify-center gap-8 lg:gap-20 text-md font-medium px-4 sm:px-6 lg:px-10 py-3 max-w-7xl mx-auto">
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
          <button onClick={() => setIlhasOpen(!ilhasOpen)}>
            <ChevronDown className="text-white" />
          </button>
        </div>
      </div>

      {/* Mobile Menu de Categorias */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="md:hidden absolute top-14 right-4 w-1/2 bg-white shadow-lg z-50 px-4 py-3 space-y-2 text-sm"
        >
          {categorias.map((cat, i) => (
            <button
              key={i}
              className="block w-full text-left text-gray-800 hover:text-orange-500"
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Mobile Menu de Ilhas */}
      {ilhasOpen && (
        <div
          ref={ilhasRef}
          className="md:hidden absolute left-0 right-0 top-[100%] bg-white shadow-lg z-50 px-4 py-3 space-y-2 text-sm"
        >
          {["Santiago", "Santo Antão", "São Nicolau", "Boa Vista"].map(
            (ilha, i) => (
              <button
                key={i}
                className="block w-full text-left text-gray-800 hover:text-orange-500"
              >
                {ilha}
              </button>
            )
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
