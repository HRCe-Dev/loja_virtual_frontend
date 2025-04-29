import { ProdutoPromocao } from "@/types/Produto";
import React from "react";
import fetchPromocoes from "./fetchPromocoes";
import PromocoesCard from "./PromocoesCard";
import SeccaoMarker from "@/app/(home)/SeccaoMarker";

const Promocoes: React.FC = async () => {
  const promocoes: ProdutoPromocao[] = await fetchPromocoes();
  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      {promocoes.slice(0, 2).map((prod, index) => (
        <PromocoesCard key={index} produto={prod} />
      ))}
      <div className="col-span-2 grid grid-cols-4 gap-4">
        {promocoes.slice(1, 5).map((prod, index) => (
          <PromocoesCard key={index + 2} produto={prod} />
        ))}
      </div>
    </div>
  );
};

export default Promocoes;
