"use client";

import { Produto } from "@/types/Produto";
import ProdutoCard from "@/componentes/ProdutoCard";
import { ProdutoListaLg } from "@/componentes/ProdutoLista";
import SeccaoMarker from "../../(home)/SeccaoMarker";
import { useEffect, useState } from "react";
import { obterProdutosListaDesejo } from "./listadesejo";
import Loading from "@/componentes/Loading";
import Error from "@/componentes/Error";
import fetchProdutos from "@/api/fetchProdutos";

export default function ListaDesejoPage() {
  //TODO: remover produto de lista de desejo

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [ProdutosSemelhantes, setProdutosSemelhantes] = useState<Produto[]>([]);

  useEffect(() => {
    const getter = async () => {
      setLoading(true);
      const produtos = await obterProdutosListaDesejo();
      if (!produtos) setError(true);
      else setProdutos(produtos);

      const produtos2 = await fetchProdutos({
        tipo: "maisgostados",
        limit: 10,
      });
      setProdutosSemelhantes(produtos2);

      setLoading(false);
    };

    getter();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="p-4 m-4 border-b border-gray-300 ">
        <h1 className="text-3xl font-bold text-center">Lista de Desejos</h1>
      </div>

      {loading && <Loading />}

      {error && <Error />}

      {!error && !loading && (
        <>
          <ProdutoListaLg>
            {produtos &&
              produtos.map((produto) => (
                <ProdutoCard key={produto.id} produto={produto} />
              ))}{" "}
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
        </>
      )}
    </div>
  );
}
