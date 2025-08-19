"use client";

import Link from "next/link";
import { useState } from "react";

interface Props {
  onFechar: () => void;
}

export default function CookieModal({ onFechar }: Props) {
  const [preferencias, setPreferencias] = useState({
    funcionais: false,
    publicidade: false,
    desempenho: false,
    naoClassificado: false,
  });

  const toggle = (key: keyof typeof preferencias) => {
    setPreferencias({ ...preferencias, [key]: !preferencias[key] });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) onFechar();
      }}
    >
      {/* Fundo escurecido com blur */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-40" />

      {/* Modal centralizado */}
      <div className="relative z-50 bg-white rounded-xl shadow-xl w-full max-w-xl p-6 text-sm">
        <h2 className="text-xl font-bold mb-4">Suas Preferências de Cookies</h2>

        <p className="text-gray-600 mb-6">
          Usamos cookies para melhorar sua experiência neste site. Você pode
          escolher quais tipos de cookies permitir e alterar suas preferências a
          qualquer momento. Desativar cookies pode afetar sua experiência neste
          site. Você pode saber mais consultando nossa{" "}
          <Link
            href="/politica-de-cookies"
            className="text-orange-500 underline"
          >
            Política de Cookies
          </Link>
          .
        </p>

        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-2 font-semibold text-gray-700">
              <input
                type="checkbox"
                checked
                disabled
                className="accent-gray-400"
              />
              Cookies Essenciais (5){" "}
              <span className="text-orange-500 underline ml-2 cursor-pointer">
                Mostrar
              </span>
            </label>
            <p className="text-gray-500 pl-6 text-xs">
              Cookies necessários para habilitar as funcionalidades básicas do
              site.
            </p>
          </div>

          {[
            {
              label: "Cookies Funcionais",
              key: "funcionais",
              qtd: 3,
              desc: "Cookies usados para aprimorar a funcionalidade do site.",
            },
            {
              label: "Cookies de Publicidade",
              key: "publicidade",
              qtd: 4,
              desc: "Cookies usados para veicular anúncios mais relevantes aos seus interesses.",
            },
            {
              label: "Cookies de Desempenho",
              key: "desempenho",
              qtd: 1,
              desc: "Cookies usados para entender como o site está sendo usado.",
            },
            {
              label: "Não Classificado",
              key: "naoClassificado",
              qtd: 0,
              desc: "Cookies que ainda não foram categorizados.",
            },
          ].map(({ label, key, qtd, desc }) => (
            <div key={key}>
              <label className="flex items-center gap-2 font-semibold text-gray-700">
                <input
                  type="checkbox"
                  className="accent-orange-500"
                  checked={preferencias[key as keyof typeof preferencias]}
                  onChange={() => toggle(key as keyof typeof preferencias)}
                />
                {label} ({qtd}){" "}
                <span className="text-orange-500 underline ml-2 cursor-pointer">
                  Mostrar
                </span>
              </label>
              <p className="text-gray-500 pl-6 text-xs">{desc}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onFechar}
            className="border border-orange-500 text-orange-500 font-semibold rounded-full px-4 py-2 text-sm hover:bg-orange-50"
          >
            Salvar Preferências
          </button>
          <button
            onClick={() => {
              localStorage.setItem("cookies_aceitos", "sim");
              onFechar();
            }}
            className="bg-orange-500 text-white font-semibold rounded-full px-4 py-2 text-sm hover:bg-orange-600"
          >
            Aceitar todos cookies
          </button>
        </div>
      </div>
    </div>
  );
}
