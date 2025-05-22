import { ProdutoPromocao } from "@/types/Produto";
import React from "react";
import fetchPromocoes from "./fetchPromocoes";
import PromocoesCard from "./PromocoesCard";

const Promocoes: React.FC = async () => {
  const promocoes: ProdutoPromocao[] = await fetchPromocoes();
  return (
    <div className="space-y-6">
      {/* Bloco 1: Primeiras 2 promoções */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 md:grid md:grid-cols-2 md:gap-4 w-max md:w-full">
          {promocoes.slice(0, 2).map((prod, index) => (
            <div
              key={index}
              className="min-w-[240px] md:min-w-0"
            >
              <PromocoesCard produto={prod} />
            </div>
          ))}
        </div>
      </div>

      {/* Bloco 2: Mais 4 promoções */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 md:grid md:grid-cols-4 md:gap-4 w-max md:w-full">
          {promocoes.slice(1, 5).map((prod, index) => (
            <div
              key={index + 2}
              className="min-w-[200px] md:min-w-0"
            >
              <PromocoesCard produto={prod} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Promocoes;
