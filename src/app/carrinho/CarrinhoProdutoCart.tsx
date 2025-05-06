"use client";

import SeletorQuantidade from "@/componentes/SeletorQuantidade";
import { ProdutoCarrinho } from "@/types/Produto";
import React from "react";
import { BtnListaDesejo } from "@/componentes/Buttons/ButtonListaDesejo";
import { BtnTrash } from "@/componentes/Buttons/Buttons";

interface carrinhoCardProps {
  produto: ProdutoCarrinho;
  removerProduto: (produto_id: string) => void;
}

const CarrinhoProdutoCart: React.FC<carrinhoCardProps> = ({
  produto,
  removerProduto,
}) => {
  return (
    <div className="px-10 mx-auto flex flex-row items-center justify-center gap-10 border border-gray-300 rounded-lg ">
      <div>
        {/*imagem */}
        <img src={produto.imagem_url} alt={produto.nome} className="h-40 " />
      </div>
      <div className="flex flex-col">
        {/*dados: nome, opcoes, preco */}
        <h2 className="text-xl font-bold">{produto.nome}</h2>

        <p className="text-sm text-gray-400">Color: Black | Size: 50cm</p>
        <h3 className="text-lg font-bold text-gray-800 mt-2">
          {produto.preco}
          <span className="text-sm ">$CVE</span>
        </h3>
      </div>
      <div className=" flex flex-row gap-5 items-center ml-10 ">
        {/* acoes*/}
        <BtnListaDesejo tipo={1} produto_id={produto.id} />
        <SeletorQuantidade />
        <BtnTrash
          onClick={() => {
            removerProduto(produto.id);
          }}
          title="Remover item do carrinho"
        />
      </div>
    </div>
  );
};

export default CarrinhoProdutoCart;
