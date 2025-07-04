import { url } from "@/api/url";
import { Produto, SearchQuery } from "@/types/Produto";
import { useEffect } from "react";

export const search = async (query: URLSearchParams) => {
  alert(JSON.stringify(query));
  const res = await fetch(`${url + "produtos/search"}?${query.toString()}`);

  const dados = await res.json();

  if (!(await res.ok)) {
    alert(dados.message);
    throw Error(dados.message);
  }

  return dados as Produto[];
};

export const useSearch = (
  query: SearchQuery,
  setProdutos: React.Dispatch<React.SetStateAction<Produto[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  dependencies: React.DependencyList
) => {
  useEffect(() => {
    const getter = async () => {
      try {
        setLoading(true);

        const query_ = new URLSearchParams();

        Object.entries(query).forEach(([key, value]) => {
          if (value !== undefined && value !== "") {
            query_.append(key, value);
          }
        });

        const produtos = await search(query_);

        setProdutos(produtos);
      } catch (error) {
        console.error(error);
        setError(error as unknown as string);
      } finally {
        setLoading(false);
      }
    };

    if (query.q || query.subcategoria || query.categoria) {
      getter();
    }
  }, dependencies);
};
