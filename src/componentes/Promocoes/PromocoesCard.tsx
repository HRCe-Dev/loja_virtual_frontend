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

      {/* Overlay com informações */}
      <div
        id="info"
        className="absolute inset-0 flex flex-col items-center justify-center 
           bg-black bg-opacity-50 text-white p-4 
           opacity-50 md:opacity-0 md:group-hover:opacity-70 
           transition-opacity duration-300"
      >
        <p className="absolute top-2 right-2 text-xs font-bold bg-red-500 px-2 py-1 rounded z-10 block md:hidden">
          {desconto}% OFF
        </p>

        {/* Só Desktop – centralizado */}
        <p className="hidden md:block text-sm md:text-lg font-bold bg-red-500 px-2 py-1 rounded mb-2">
          {desconto}% OFF
        </p>
        <h2 className="text-center text-base md:text-xl font-semibold">
          {produto.nome}
        </h2>
      </div>
    </div>
  );
};

export default PromocoesCard2;
