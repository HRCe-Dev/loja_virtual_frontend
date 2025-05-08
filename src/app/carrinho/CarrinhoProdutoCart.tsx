"use client";

import SeletorQuantidade from "@/componentes/SeletorQuantidade";
import { ProdutoCarrinho } from "@/types/Produto";
import React from "react";
import { BtnListaDesejo } from "@/componentes/Buttons/ButtonListaDesejo";
import { BtnTrash } from "@/componentes/Buttons/Buttons";

interface carrinhoCardProps {
  produto: ProdutoCarrinho;
  removerProduto: (produto_id: string) => void;
  btnLoading?: boolean;
}

const CarrinhoProdutoCart: React.FC<carrinhoCardProps> = ({
  produto,
  removerProduto,
  btnLoading,
}) => {
  return (
    <div className="px-5 sm:px-10 mx-auto flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-10 border border-gray-300 rounded-lg">
      <div>
        {/* imagem */}
        <img
          src={produto.imagem_url}
          alt={produto.nome}
          className="h-40 sm:h-48"
        />
      </div>
      <div className="flex flex-col sm:flex-1 text-center sm:text-start">
        {/* dados: nome, opcoes, preco */}
        <h2 className="text-xl font-bold w-50  sm:w-70 overflow-hidden text-ellipsis line-clamp-2">
          {produto.nome}
        </h2>

        <p className="text-sm text-gray-400">Color: Black | Size: 50cm</p>
        <h3 className="text-lg font-bold text-gray-800 mt-2">
          {produto.preco}
          <span className="text-sm ">$CVE</span>
        </h3>
      </div>
      <div className="flex flex-row gap-5 items-center sm:ml-10 mt-4 sm:mt-0 pb-5 sm:pb-0">
        {/* acoes */}
        <BtnListaDesejo tipo={1} produto_id={produto.id} />
        <SeletorQuantidade
          qtd_={produto.qtd}
          estoque={produto.estoque}
          produto_id={produto.id}
          carrinho={true}
        />
        <BtnTrash
          onClick={() => {
            removerProduto(produto.id);
          }}
          title="Remover item do carrinho"
          disable={btnLoading}
        />
      </div>
    </div>
  );
};

export default CarrinhoProdutoCart;
