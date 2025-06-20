import { fetchWithAuth } from "@/api/fetch_auth";
import { url } from "@/api/url";
import { HistoricoPedidos } from "@/types/PedidoDadosTypes";
import { useEffect, useRef } from "react";

const url_ = url + "protected/checkout/meuspedidos";

//obter meus pedidos
const obterMeusPedidos = async (): Promise<HistoricoPedidos[]> => {
  const res = await fetchWithAuth(url_);

  const dados = await res.json();

  if (!(await res.ok)) {
    alert(dados.message);
    throw Error(dados.message);
  }

  return dados as HistoricoPedidos[];
};

//hook para obter meus pedidos
export const useObterHistoricoPedidos = (
  setHistoricoPedidos: React.Dispatch<React.SetStateAction<HistoricoPedidos[]>>,
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

        const HistoricoPedidos = await obterMeusPedidos();

        setHistoricoPedidos(HistoricoPedidos);
      } catch (error) {
        console.error(error);
        setErro("Erro em conectar com servidor");
      } finally {
        setLoading(false);
      }
    };

    getter();
  }, dependencies);
};
