"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

import PedidoStepper from "./PedidoStepper";
import ResumoPedido from "@/componentes/ResumoPedido";
import { useGetPedidoDados } from "@/app/checkout/checkout.api";

import { PedidoDados1 } from "@/types/PedidoDadosTypes";
import Loading from "@/componentes/Loading";

export default function PedidoStatusPage() {
  const faseAtual = 1;
  const params = useParams();
  const pedido_id = params?.id as string;
  const [pedidoData, setPedidoData] = useState<PedidoDados1 | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useGetPedidoDados(pedido_id, setPedidoData, setLoading, setError);

  return (
    <div className="min-h-screen bg-white rounded-2xl p-4">
      <Link href="/historico" className="text-sm text-gray-800 hover:underline">
        <ArrowLeft className="w-6 h-6" />
      </Link>

      <PedidoStepper current={faseAtual} />

      {loading && <Loading />}
      {!loading && pedidoData && <ResumoPedido pedidoData={pedidoData} />}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
