// app/produtoComposto/ProductTabs.tsx
"use client";

import { useState } from "react";
import DescricaoProduto from "../../produto/[id]/DescricaoProduto";
import AvaliacoesPage from "../../produto/[id]/AvaliacoesPage";

interface ProductTabsProps {
  descricao: string;
}

export default function ProductTabs({ descricao }: ProductTabsProps) {
  const [tab, setTab] = useState("descricao");

  return (
    <div className="mt-16">
      <div className="flex border-b border-gray-200 mb-4">
        {["descricao", "caracteristicas", "avaliacoes"].map((item) => (
          <button
            key={item}
            onClick={() => setTab(item)}
            className={`px-4 py-2 text-sm font-medium capitalize border-b-2 transition-colors duration-200 ${
              tab === item
                ? "border-orange-500 text-orange-500"
                : "border-transparent text-gray-500"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {tab === "descricao" && <DescricaoProduto descricaoText={descricao} />}
      {tab === "avaliacoes" && <AvaliacoesPage />}
      {tab === "caracteristicas" && (
        <p className="text-gray-600 text-sm">
          Conteúdo de características (ex: peso, material, etc.)
        </p>
      )}
    </div>
  );
}
