import { Produto } from "@/types/Produto";
import Image from "next/image";
import React from "react";

interface ProdutoCardProps {
  produto: Produto;
}

const ProdutoCard: React.FC<ProdutoCardProps> = ({ produto }) => {
  return (
    <div className="w-64 bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:border-orange-300 hover:shadow-xl transition-shadow duration-300">
      {/* Espaço para imagem do produto (não mostrada no exemplo) */}
      <div className="h-40 bg-gray-100 flex items-center justify-center">
        {/*<span className="text-gray-400">Imagem do produto</span> */}
        <Image
          src={produto.imagem_url}
          alt={produto.nome}
          width={800}
          height={800}
        />
      </div>

      <div className="p-4">
        {/* Nome do produto */}
        <h2 className="text-lg font-bold text-gray-800 mb-1 uppercase">
          {produto.nome}
        </h2>
        {/* Preço */}
        <p className="text-2xl font-bold text-gray-900 mb-4">
          {produto.preco}
          <span className="text-sm">$00CVE</span>
        </p>

        {/* Botão de compra */}
        <button className="w-full bg-orange-500 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded transition-colors duration-300 uppercase">
          Comprar agora
        </button>
      </div>
    </div>
  );
};

export default ProdutoCard;
