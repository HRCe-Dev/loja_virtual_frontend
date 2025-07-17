"use cliente";

import { useEffect, useState } from "react";
import { Produto } from "@/types/Produto";
import { url } from "../../../api/url";
import { fetchWithAuth } from "../../../api/fetch_auth";

const url_ = url + "protected/listadesejo/";

export function useListaDesejo() {
  const [produtos, setProdutos] = useState<Produto[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const obter = async () => {
      try {
        const res = await fetchWithAuth(url_, { method: "GET" });

        if (!res.ok) {
          const errorData = await res.json();
          console.error(errorData?.message || res.statusText);
          setErro(errorData?.message || "Erro desconhecido");
          return;
        }

        const produtos = (await res.json()) as Produto[];
        setProdutos(produtos);
      } catch (err) {
        console.error(err);
        setErro("Erro ao buscar dados");
      } finally {
        setLoading(false);
      }
    };

    obter();
  }, []);

  return { produtos, loading, erro };
}

export const adicionarListaDesejoOnline = async (
  produto_id: string
): Promise<boolean> => {
  try {
    const res = await fetchWithAuth(url_, {
      method: "POST",
      body: JSON.stringify({ produto_id }),
    });

    if (res.status === 201) return true;
    else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const removerListaDesejoOnline = async (
  produto_id: string
): Promise<boolean> => {
  try {
    const res = await fetchWithAuth(url_, {
      method: "DELETE",
      body: JSON.stringify({ produto_id }),
    });

    if (res.ok) return true;
    else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
