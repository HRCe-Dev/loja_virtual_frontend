"use client";
import { fetchWithAuth } from "@/api/fetch_auth";
import { url } from "@/api/url";
import { MetodoEnvio } from "@/types/MetodoEnvioTypes";
import { useEffect } from "react";
import {
  esvaziarCarrinho,
  obterCarrinho,
} from "../(cliente)/carrinho/carrinho";
import { PedidoDados1 } from "@/types/PedidoDadosTypes";

//obter metodos de envio
export function useGetMetodosEnvio(
  ilha: string,
  setMetodosEnvio: React.Dispatch<React.SetStateAction<MetodoEnvio[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  dependencies: React.DependencyList = []
) {
  useEffect(() => {
    const getter = async () => {
      setLoading(true);

      const carrinho = obterCarrinho();

      const res = await fetch(url + `envio/metodos?ilha=${ilha}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(carrinho),
      });

      if (!res.ok) {
        setError("Erro em obter metodos de Envio");
      }

      const dados: MetodoEnvio[] = await res.json();

      setMetodosEnvio(dados);

      //alert(JSON.stringify(dados));

      setLoading(false);
    };

    if (ilha) getter();
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
  dependencies: React.DependencyList = [],
  pagamento_page?: boolean // para indicar se o uso vem da pagina de pagamento
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

      if (dados.status !== "NAO PAGO" && pagamento_page) {
        return (window.location.href = `/checkout/confirmacao/${dados.id}`);
      }
      setPedidoData({
        ...dados,
      });

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

    //const data = await res.json();

    //alert(JSON.stringify(data));

    if (res.status === 201) {
      esvaziarCarrinho(); //Pode dar erro, mas nao vai ser critico
      return true;
    }

    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function abrirReciboPagamento(pedido_id: string): Promise<void> {
  try {
    const res = await fetchWithAuth(
      `${url}protected/checkout/recibo/${pedido_id}`,
      {
        method: "GET",
        headers: {
          // Não definir "Content-Type" para não conflitar com retorno binário
          Accept: "application/pdf",
        },
      }
    );

    if (!res.ok) {
      alert("Erro em buscar recibo");
      throw new Error(`Erro ao buscar PDF: ${res.status}`);
    }

    const blob = await res.blob();

    // Criar uma URL temporária
    const pdfUrl = URL.createObjectURL(blob);

    window.open(pdfUrl, "_blank");

    // Opcional: liberar a URL após 10 minutos
    setTimeout(() => URL.revokeObjectURL(pdfUrl), 600000);
  } catch (error) {
    alert("Erro em abrir recibo");
    console.error("Erro ao abrir PDF:", error);
  }
}
