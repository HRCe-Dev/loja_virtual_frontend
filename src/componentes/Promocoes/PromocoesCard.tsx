import { ProdutoPromocao } from "@/types/Produto";
import Image from "next/image";
import React from "react";

interface PromocoesCardProps {
  produto: ProdutoPromocao;
}

const PromocoesCard2: React.FC<PromocoesCardProps> = ({ produto }) => {
  const desconto = produto.desconto ?? 20;

  return (
    <div className="relative w-full aspect-[4/3] rounded overflow-hidden group shadow-md">
      {/* Imagem Responsiva */}
      <Image
        src={produto.imagem_url}
        alt={produto.nome}
        fill
        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      
      <div
        id="info"
        className="absolute top-1/2 -translate-y-1/2 right-2 bg-black/50 backdrop-blur-sm rounded-md px-3 py-4 shadow-md text-right z-10 w-1/2"
      >
        <p className="text-xs font-bold text-red-600">
          {desconto}% OFF
        </p>
        <h2 className="text-sm font-bold text-white">
          {produto.nome}
        </h2>
      </div>
    </div>
  );
};

export default PromocoesCard2;
