import { ProdutoPromocao } from "@/types/Produto";
import Image from "next/image";
import React from "react";

interface PromocoesCardProps {
  produto: ProdutoPromocao;
}

const PromocoesCard2: React.FC<PromocoesCardProps> = ({ produto }) => {
  return (
    <div className="relative w-full h-full group ">
      {/* Imagem - ajuste width/height conforme necessário */}
      <Image
        src={produto.imagem_url}
        alt={produto.nome}
        width={400} // ou o tamanho desejado
        height={400} // ou o tamanho desejado
        className="w-full h-full object-cover"
      />

      {/* Container de informações posicionado no centro */}
      <div
        id="info"
        className="absolute inset-0 flex flex-col items-center justify-center 
                bg-black bg-opacity-40 text-white p-4 opacity-0 
                group-hover:opacity-85 transition-opacity duration-300"
      >
        <p className="text-xl font-bold bg-red-500 px-2 rounded mb-2">
          {produto.desconto | 20}% OFF
        </p>
        <h2 className="text-2xl font-bold text-center">{produto.nome}</h2>
      </div>
    </div>
  );
};

export default PromocoesCard2;
