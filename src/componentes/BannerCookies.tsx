// CookieBanner.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CookieModal from "./CookieModal";

export default function CookieBanner() {
  const [visivel, setVisivel] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    const aceitou = localStorage.getItem("cookies_aceitos");
    if (!aceitou) setVisivel(true);
  }, []);

  if (!visivel && !mostrarModal) return null;

  return (
    <>
      {visivel && (
        <div className="fixed bottom-10 inset-x-4 md:inset-x-10 z-40 bg-white border border-gray-200 rounded-lg shadow-md px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-700 text-center md:text-left">
            Este site utiliza cookies para melhorar a sua experiência. Ao clicar
            em <strong>&quot;Aceitar&quot;</strong>, você concorda com a
            nossa&nbsp;
            <Link
              href="/politica-de-cookies"
              className="text-orange-500 hover:underline"
            >
              Política de Cookies.
            </Link>
          </p>

          <div className="flex gap-3 flex-wrap justify-center md:justify-end">
            <div
              onClick={() => {
                localStorage.setItem("cookies_aceitos", "nao");
                setVisivel(false);
              }}
              className="text-gray-700 hover:text-gray-900 text-sm py-3 cursor-pointer"
            >
              <p className="underline">Rejeitar Cookies</p>
            </div>
            <button
              onClick={() => {
                setVisivel(false); // fecha o banner
                setMostrarModal(true); // abre o modal
              }}
              className="bg-[#265674] hover:bg-blue-400 text-white text-sm font-semibold px-5 py-3 rounded-3xl"
            >
              Configurar
            </button>
            <button
              onClick={() => {
                localStorage.setItem("cookies_aceitos", "sim");
                setVisivel(false);
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-3 rounded-3xl"
            >
              Aceitar
            </button>
          </div>
        </div>
      )}

      {mostrarModal && <CookieModal onFechar={() => setMostrarModal(false)} />}
    </>
  );
}
