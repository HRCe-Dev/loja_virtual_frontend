import { Produto } from "@/types/Produto";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface PromocoesCardProps {
  produto: Produto;
}

const PromocoesCard2: React.FC<PromocoesCardProps> = ({ produto }) => {
  return (
    <Link href={`/produto/${produto.id}`}>
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
          <p className="text-lg font-bold text-red-600">
            {produto.promocao?.desconto ?? 0}% Desconto
          </p>
          <h2 className="text-sm font-bold text-white line-clamp-2 max-h-[3em]">
            {produto.nome}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default PromocoesCard2;
