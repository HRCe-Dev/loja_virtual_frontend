"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import ProdutoCard from "@/componentes/ProdutoCard";
import FiltroSidebar from "@/componentes/FiltroSidebar";
import { Produto, SearchQuery } from "@/types/Produto";
import { ProdutoListaLg } from "@/componentes/ProdutoLista";
import { useSearch } from "./search.api";
import Loading from "@/componentes/Loading";

interface PageProps {
  filtro?: Partial<SearchQuery>;
}

export default function PaginaBusca({ filtro }: PageProps) {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const termo = searchParams.get("termo")?.toLowerCase() || "";
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [mostrarFiltro, setMostrarFiltro] = useState(false);
  const [filtros, setFiltros] = useState<Partial<SearchQuery> | null>(
    filtro || null
  );

  //colocar os filtros aqui
  useSearch(
    { q: termo!, ...filtros },
    setProdutos,
    setLoading,
    setError,
    filtro ? [] : [termo, filtros]
  );

  return (
    <div className="flex bg-gray-50 min-h-screen pt-5">
      {" "}
      {/* min-h-screen garante altura */}
      <aside className="hidden md:block w-1/5 px-4 sticky top-24 self-start max-h-[calc(100vh-6rem)] overflow-y-auto">
        <FiltroSidebar filtros={filtros} setFiltros={setFiltros} />
      </aside>
      {/* Conteúdo principal */}
      <main className="flex-1 px-4 md:px-8">
        {/* Cabeçalho responsivo */}
        <div className="bg-white rounded-2xl px-6 py-4 shadow mb-6 space-y-2 md:space-y-0 md:flex md:items-center md:justify-between">
          {/* Título */}
          <p className="text-lg font-medium">
            Resultados para:{" "}
            <span className="font-semibold">{`"${termo}"`}</span>
          </p>

          {/* Contagem e Ações */}
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0">
            <span className="text-sm text-gray-500">
              {produtos.length} produtos encontrados
            </span>

            {/* Dropdown de ordenação */}
            <button className="border border-gray-300 text-sm rounded-full px-4 py-1 hover:bg-gray-100 transition">
              Mais Relevantes ⌄
            </button>

            {/* Botão de filtros (visível só no mobile) */}
            <button
              onClick={() => setMostrarFiltro(!mostrarFiltro)}
              className="md:hidden border border-gray-300 text-sm rounded-full px-4 py-1 hover:bg-gray-100 transition"
            >
              Filtros ⌄
            </button>
          </div>
        </div>

        {/* Lista de produtos */}
        {!loading && !error && (
          <ProdutoListaLg>
            {produtos.length === 0 ? (
              <p className="text-gray-600">Nenhum produto encontrado.</p>
            ) : (
              produtos.map((prod) => (
                <ProdutoCard key={prod.id} produto={prod} />
              ))
            )}
          </ProdutoListaLg>
        )}

        {loading && !error && <Loading />}
        {error && <p>{error}</p>}
      </main>
      {/* Sidebar em mobile como overlay opcional */}
      {mostrarFiltro && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-start">
          <div className="bg-white w-64 h-full p-4">
            <button
              onClick={() => setMostrarFiltro(false)}
              className="text-gray-500 text-sm mb-4"
            >
              Fechar ✕
            </button>
            <FiltroSidebar setFiltros={setFiltros} filtros={filtros} />
          </div>
        </div>
      )}
    </div>
  );
}
