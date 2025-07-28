"use client";
import { Produto } from "@/types/Produto";
import { BtnListaDesejo } from "@/componentes/Buttons/ButtonListaDesejo";
import { Ban, Repeat, Truck } from "lucide-react";
import SeletorQuantidade from "@/componentes/SeletorQuantidade";
import { BtnComprarAgora } from "@/componentes/Buttons/ButtonComprarAgora";
import { BtnAdicionarCarrinho } from "@/componentes/Buttons/ButtonCarrinho";
import { ButtonLinkNoBg, ButtonNoBg } from "@/componentes/Buttons/Buttons";
import Moeda from "@/componentes/Moeda";

interface DetalhesProdutoProps {
  produto: Produto;
}

export default function DetalhesProduto({ produto }: DetalhesProdutoProps) {
  return (
    <div className=" relative w-full lg:w-1/2 flex flex-col gap-5 lg:mx-10 px-4 lg:my-10">
      {/*nome, preco, addlista de desejo, qtd, addcart, buynow, entrega rapida, troca e devolucoes */}

      {produto.promocao && produto.estoque > 0 && (
        <div
          title={produto.promocao.nome}
          className="absolute top-10 right-2 z-20 px-3 py-1 text-2xl font-bold rounded-2xl bg-gradient-to-br from-red-600 to-red-400 text-white shadow-lg 
                animate-bounce hover:scale-105 transition-transform duration-300 ease-in-out grup-hover:invisible"
        >
          <p>- {produto.promocao.desconto}%</p>
        </div>
      )}

      {produto.estoque === 0 && (
        <div
          className="absolute top-10 right-2 z-30 px-3 py-1 text-2xl font-bold rounded-2xl bg-gradient-to-br  from-zinc-500 to-zinc-300 text-red-700 shadow-lg 
                animate-bounce hover:scale-105 transition-transform duration-300 ease-in-out grup-hover:invisible"
        >
          <span className="flex gap-2 items-center">
            <Ban />
            ESGOTADO
          </span>
        </div>
      )}

      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
        {produto.nome}
      </h1>
      <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center border-b border-gray-400 mb-4">
        {produto.promocao ? (
          <div className="flex flex-col gap-1 ">
            <div className="text-lg line-through">
              <Moeda className=" text-gray-400">{produto.preco}</Moeda>
            </div>
            <Moeda className="text-2xl  font-bold">
              {produto.preco * (1 - produto.promocao.desconto / 100)}
            </Moeda>
          </div>
        ) : (
          <Moeda className="text-2xl mt-2 font-bold">{produto.preco}</Moeda>
        )}
        {/*TODO: considerar se o produto estiver em promoção*/}

        <div className="mt-2 smmt-0">
          <BtnListaDesejo produto_id={produto.id} tipo={3} />
        </div>
      </div>

      <div className="flex flex-row flex-wrap gap-2 items-center mb-2">
        <SeletorQuantidade produto_id={produto.id} />
        <p className="text-sm md:text-xl font-bold">
          {produto.estoque || 1} Disponível
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 ">
        <BtnAdicionarCarrinho
          produto_id={produto.id}
          className="flex flex-row items-center justify-center gap-2 md:gap-4 py-1 px-2 md:py-3 md:px-6 bg-orange-500 text-lg font-bold text-white rounded-lg hover:bg-orange-700"
        />
        <BtnComprarAgora
          produto_id={produto.id}
          styleClass="py-1 px-2 bg-white text-lg font-bold  text-orange-500 rounded-lg border-1 border-orange-500 hover:bg-orange-700 hover:text-white"
        />
      </div>

      <div className="mt-5 flex sm:flex-row gap-4 sm:justify-between  sm:items-center">
        <ButtonNoBg>
          {" "}
          <Truck /> Entrega Rápida
        </ButtonNoBg>
        <ButtonLinkNoBg href="/politicaDevolucoes">
          {" "}
          <Repeat />
          Trocas e Devolução
        </ButtonLinkNoBg>
      </div>
    </div>
  );
}
