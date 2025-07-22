"use client";

import SeletorQuantidade from "@/componentes/SeletorQuantidade";
import { ProdutoCarrinho } from "@/types/Produto";
import React from "react";
import { BtnListaDesejo } from "@/componentes/Buttons/ButtonListaDesejo";
import { BtnTrash } from "@/componentes/Buttons/Buttons";
import Image from "next/image";
import { AlertTriangle } from "lucide-react";
import Moeda from "@/componentes/Moeda";
import Countdown from "@/componentes/Countdown";

interface carrinhoCardProps {
  produto: ProdutoCarrinho;
  setProdutoQtd: (produto_id: string, qtd: number) => void;
  removerProduto: (produto_id: string) => void;
  btnLoading?: boolean;
}

const CarrinhoProdutoCart: React.FC<carrinhoCardProps> = ({
  produto,
  removerProduto,
  btnLoading,
  setProdutoQtd,
}) => {
  return (
    <div className="px-5 sm:px-10 mx-auto flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-10 border border-gray-300 rounded-lg">
      <div className="relative flex items-center justify-center w-40 h-48">
        {produto.estoque === 0 && (
          <div className="absolute flex flex-col items-center justify-center gap-1">
            <AlertTriangle className=" text-red-600 font-bold size-10" />
            <span className="text-sm bg-white/40 font-bold rounded-xl p-1 ">
              Esgotado
            </span>
          </div>
        )}
        {produto.promocao && (
          <div className="absolute  flex flex-col items-center  bg-red-600/60 rounded-2xl text-gray-800 animate-pulse">
            <span className="text-lg font-extrabold">
              - {produto.promocao.desconto} %
            </span>
            <Countdown dataFim={produto.promocao?.data_fim!} />
          </div>
        )}

        {/* imagem */}
        <Image
          src={produto.imagem_url}
          alt={produto.nome}
          className="object-contain w-full h-full"
          width={160}
          height={192}
        />
      </div>
      <div className="flex flex-col sm:flex-1 text-center sm:text-start">
        {/* dados: nome, opcoes, preco */}
        <h2 className="text-xl font-bold w-50  sm:w-70 overflow-hidden text-ellipsis line-clamp-2">
          {produto.nome}
        </h2>

        {/*<p className="text-sm text-gray-400">Color: Black | Size: 50cm</p> */}
        <h3 className="">
          {produto.promocao ? (
            <span className="flex flex-col">
              <Moeda className="text-sm text-gray-500 mt-1 line-through">
                {produto.preco}
              </Moeda>
              <Moeda className="text-lg font-bold text-gray-800 ">
                {produto.preco -
                  produto.preco * (produto.promocao.desconto / 100)}
              </Moeda>
            </span>
          ) : (
            <Moeda className="text-lg font-bold text-gray-800 mt-2">
              {produto.preco}
            </Moeda>
          )}
        </h3>
      </div>
      <div className="flex flex-row gap-5 items-center sm:ml-10 mt-4 sm:mt-0 pb-5 sm:pb-0">
        {/* acoes */}
        <BtnListaDesejo tipo={1} produto_id={produto.id} />
        <SeletorQuantidade
          qtd_={produto.estoque === 0 ? 0 : produto.qtd}
          setProdutoQtd={setProdutoQtd}
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
