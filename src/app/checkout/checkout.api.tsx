"use client";
import { verifyAuth } from "@/api/auth";
import { fetchWithAuth } from "@/api/fetch_auth";
import { url } from "@/api/url";
import { MetodoEnvio } from "@/types/MetodoEnvioTypes";
import { useEffect } from "react";
import { obterCarrinho } from "../carrinho/carrinho";
import { PedidoDados1 } from "@/types/PedidoDadosTypes";

//obter metodos de envio
export function useGetMetodosEnvio(
  setMetodosEnvio: React.Dispatch<React.SetStateAction<MetodoEnvio[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  dependencies: React.DependencyList = []
) {
  useEffect(() => {
    const verifyLogin = async () => {
      setLoading(true);

      const res = await fetch(url + "envio");

      if (!res.ok) {
        setError("Erro em obter metodos de Envio");
      }

      const dados: MetodoEnvio[] = await res.json();

      setMetodosEnvio(dados);

      //alert(JSON.stringify(dados));

      setLoading(false);
    };

    verifyLogin();
  }, dependencies);
}

export async function realizarCheckout(pedidoData: {
  endereco_id: number;
  metodo_entrega_id: number;
}): Promise<string | null> {
  try {
    const carrinho = obterCarrinho();

    const res = await fetchWithAuth(url + "protected/checkout", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...pedidoData, itens_pedido: carrinho }),
    });

    const data = await res.json();

    if ((await res.status) === 201) {
      return data.pedido_id;
    }

    return null;
  } catch (error) {
    console.error(error);
    console.log(JSON.stringify(error));
    return null;
  }
}

export function useGetPedidoDados(
  pedido_id: string,
  setPedidoData: React.Dispatch<React.SetStateAction<PedidoDados1 | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  dependencies: React.DependencyList = []
) {
  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      const res = await fetchWithAuth(
        url + "protected/checkout/meuspedidos/" + pedido_id
      );

      if (!res.ok) {
        setError("Erro em obter dados do pedido");
      }

      const dados: PedidoDados1 = await res.json();

      setPedidoData(dados);

      //alert(JSON.stringify(dados));

      setLoading(false);
    };

    getData();
  }, dependencies);
}

export async function pagarPedido(
  pedido_id: string,
  metodo_pagamento: string
): Promise<boolean> {
  try {
    const res = await fetchWithAuth(
      url + "protected/checkout/pagamento/" + pedido_id,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ metodo_pagamento }),
      }
    );

    const data = await res.json();

    alert(JSON.stringify(data));

    if (res.status === 201) {
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
}
