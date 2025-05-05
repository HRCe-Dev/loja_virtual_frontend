"use client";

import { Produto } from "@/types/Produto";
import { useListaDesejo } from "./listadesejo.api";
import { Produtos } from "@/util/produtosTeste";
import ProdutoCard from "@/componentes/produtoCard2";
import { ProdutoListaLg } from "@/componentes/ProdutoLista";
import SeccaoMarker from "../(home)/SeccaoMarker";

export default function ListaDesejo() {
  //const { produtos, loading, erro } = useListaDesejo();

  const produtos: Produto[] = Produtos;
  const ProdutosSemelhantes: Produto[] = Produtos;

  return (
    <div className="m-10">
      <div className="p-4 m-4 border-b-3 border-gray-300 ">
        <h1 className="text-3xl font-bold text-center">Lista de Desejos</h1>
      </div>

      <ProdutoListaLg>
        {produtos &&
          produtos.map((produto) => <ProdutoCard produto={produto} />)}{" "}
      </ProdutoListaLg>

      {/* TODO: produtos relacionados*/}
      <div className="mt-12 flex flex-col gap-5">
        <SeccaoMarker>Produtos Relacionados</SeccaoMarker>
        <ProdutoListaLg>
          {ProdutosSemelhantes &&
            ProdutosSemelhantes.slice(0, 4).map((prod) => (
              <ProdutoCard key={prod.id} produto={prod} />
            ))}
        </ProdutoListaLg>
      </div>
    </div>
  );
}
