'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import PedidoStepper from './PedidoStepper';
import ResumoPedido from '@/componentes/ResumoPedido';
import { useGetPedidoDados } from '@/app/checkout/checkout.api';
import fetchProdutosLista from '@/api/fetchProdutosLista';

import { PedidoDados1 } from '@/types/PedidoDadosTypes';
import { Produto } from '@/types/Produto';
import Loading from '@/componentes/Loading';

export default function PedidoStatusPage() {
  const faseAtual = 2;
  const params = useParams();
  const pedido_id = params?.id as string;
  const router = useRouter();

  const [pedidoData, setPedidoData] = useState<PedidoDados1 | null>(null);
  const [produtoDetalhes, setProdutosDetalhes] = useState<Produto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useGetPedidoDados(pedido_id, setPedidoData, setLoading, setError);

  useEffect(() => {
    const getData = async () => {
      if (pedidoData) {
        const produtos = await fetchProdutosLista(pedidoData.itens_pedido);
        if (produtos) setProdutosDetalhes(produtos);
        else setError("Erro ao obter detalhes dos produtos");
      }
    };

    if (pedidoData?.status === "NAO PAGO") {
      router.push("/checkout/pagamento/" + pedido_id);
    } else {
      getData();
    }
  }, [pedidoData]);

  return (
    <div className="min-h-screen bg-white rounded-2xl p-4">
      <Link href="/historico" className="text-sm text-gray-800 hover:underline">
        <ArrowLeft className="w-6 h-6" />
      </Link>

      <PedidoStepper current={faseAtual} />

      {loading && <Loading />}
      {!loading && pedidoData && (
        <ResumoPedido
          pedidoData={pedidoData}
          produtoDetalhes={produtoDetalhes}
        />
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
