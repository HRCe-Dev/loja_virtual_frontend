"use client";
import { verifyAuth } from "@/api/auth";
import { fetchWithAuth } from "@/api/fetch_auth";
import { url } from "@/api/url";
import { MetodoEnvio } from "@/types/MetodoEnvioTypes";
import { useEffect } from "react";
import { obterCarrinho } from "../carrinho/carrinho";

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
  metodo_entrega_id: string;
}): Promise<string | null> {
  try {
    console.log(JSON.stringify(pedidoData));

    const carrinho = obterCarrinho();

    const res = await fetchWithAuth(url + "protected/checkout", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...pedidoData, itens_pedido: carrinho }),
    });

    const data = await res.json();
    alert(JSON.stringify(data));

    if ((await res.status) === 201) {
      return "id d checkout";
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
