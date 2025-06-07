"use client";
import { PedidoDados1 } from "@/types/PedidoDadosTypes";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGetPedidoDados } from "../checkout.api";
import fetchProdutosLista from "@/api/fetchProdutosLista";
import { Produto } from "@/types/Produto";
import Loading from "@/componentes/Loading";
import ResumoPedido from "@/componentes/ResumoPedido";

export default function Confirmation() {
  const params = useParams();
  const pedido_id = params?.id as string;
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pedidoData, setPedidoData] = useState<PedidoDados1 | null>(null);
  const [produtoDetalhes, setProdutosDetalhes] = useState<Produto[]>([]);
  const router = useRouter();

  useGetPedidoDados(pedido_id, setPedidoData, setLoading, setError);

  useEffect(() => {
    //obter detalhes do produto para mostrar a imagem do produto
    const getData = async () => {
      setLoading(true);

      if (pedidoData) {
        const produtos = await fetchProdutosLista(pedidoData.itens_pedido);

        if (produtos) setProdutosDetalhes(produtos);
        else setError("Erro em obter detalhes dos produtos");
      } else {
        setError("Erro em obter itens comprados");
      }

      setLoading(false);
    };

    if (pedidoData?.status === "NAO PAGO") {
      router.push("checkout/pagamento/" + pedido_id);
    } else getData();
  }, [pedidoData]);

  const handleFinish = () => {
    router.push("/");
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow max-w-2xl mx-auto text-gray-800">
      <div className="flex flex-col items-center mb-8">
        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl">
          ✓
        </div>
        <h2 className="text-2xl font-semibold mt-4">Pedido Confirmado!</h2>
        <p className="text-sm text-gray-500 mt-1">
          Pedido #{pedidoData?.id || "000"}
        </p>
      </div>

      {!loading && pedidoData && (
        <ResumoPedido
          pedidoData={pedidoData}
          produtoDetalhes={produtoDetalhes}
        />
      )}
        

      {loading && !error && <Loading />}

      <button
        onClick={handleFinish}
        className="bg-orange-400 hover:bg-orange-500 text-white font-medium w-full py-2 rounded-md mt-6 transition"
      >
        Voltar à Página Inicial
      </button>
    </div>
  );
}
