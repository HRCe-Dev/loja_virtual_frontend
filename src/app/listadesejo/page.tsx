"use client";

import { Produto } from "@/types/Produto";
import { Produtos } from "@/util/produtosTeste";
import ProdutoCard from "@/componentes/produtoCard2";
import { ProdutoListaLg } from "@/componentes/ProdutoLista";
import SeccaoMarker from "../(home)/SeccaoMarker";
import { useEffect, useState } from "react";
import { obterProdutosListaDesejo } from "./listadesejo";

export default function ListaDesejo() {
  //TODO: remover produto de lista de desejo

  const [loading, setLoading] = useState<boolean>(true);
  const [Error, setError] = useState<boolean>(false);
  const [produtos, setProdutos] = useState<Produto[]>([]);

  const ProdutosSemelhantes: Produto[] = Produtos;

  useEffect(() => {
    const fetchProdutos = async () => {
      setLoading(true);
      const produtos = await obterProdutosListaDesejo();
      if (!produtos) setError(true);
      else setProdutos(produtos);

      setLoading(false);
    };

    fetchProdutos();
  }, []);

  return (
    <div className="m-10">
      <div className="p-4 m-4 border-b-3 border-gray-300 ">
        <h1 className="text-3xl font-bold text-center">Lista de Desejos</h1>
      </div>

      {loading && (
        <div>
          <h1 className="text-3xl font-bold text-orange-500 text-center">
            CARREGANDO OS PRODUTOS ...
          </h1>
        </div>
      )}

      {Error && (
        <div>
          <h1 className="text-3xl font-bold text-orange-500 text-center">
            ERRO EM CARREGAR OS PRODUTOS ...
          </h1>
        </div>
      )}

      {!Error && !loading && (
        <ProdutoListaLg>
          {produtos &&
            produtos.map((produto) => (
              <ProdutoCard key={produto.id} produto={produto} />
            ))}{" "}
        </ProdutoListaLg>
      )}

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
