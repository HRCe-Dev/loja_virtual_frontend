import { fetchWithAuth } from "@/api/fetch_auth";
import { url } from "@/api/url";
import { useEffect, useRef } from "react";

export interface dadosEntrega {
  titulo: string;
  nome?: string;
  telefone?: string;
  zona: {
    id: number;
    zona: string;
    cidade: string;
    cidade_id: number;
    ilha: string;
  };

  createdAt?: Date;
  updatedAt?: Date;
}

export interface dadosEntrega0 {
  clienteId: string;
  titulo: string;
  nome?: string;
  telefone?: string;
  zonaId: number;
}

const url_ = url + "protected/entrega";

//obter dados de entrega
export const obterDadosEntrega = async (): Promise<dadosEntrega[]> => {
  const res = await fetchWithAuth(url_);

  const dados = await res.json();

  if (!(await res.ok)) {
    throw Error(dados.message);
  }

  return dados as dadosEntrega[];
};

//hook para obter dados de envio
export const useObterDadosEntrega = (
  setDadosEntrega: React.Dispatch<React.SetStateAction<dadosEntrega[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setErro: React.Dispatch<React.SetStateAction<string | null>>,
  dependencies: []
) => {
  const hasRun = useRef(false);
  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const getter = async () => {
      try {
        setLoading(true);

        const dados = await obterDadosEntrega();

        setDadosEntrega(dados);
      } catch (error) {
        console.error(error);
        setErro(error instanceof Error ? error.message : String(error));
      } finally {
        setLoading(false);
      }
    };

    getter();
  }, dependencies);
};

//criar dados de entrega
export const adicionarDadosEntrega = async (
  dados: dadosEntrega0
): Promise<{ status: boolean; message?: string }> => {
  const res = await fetchWithAuth(url_, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });

  const data = await res.json();

  if (!(await res.ok)) {
    alert(data.message);
    return { status: false, message: data.message };
  }

  alert(data.message);

  return { status: true };
};
