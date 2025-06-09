"use client";
import Loading from "@/componentes/Loading";
import { HistoricoPedidos, Status } from "@/types/PedidoDadosTypes";
import { useState } from "react";
import { useObterHistoricoPedidos } from "./historico.api";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

// app/(dashboard)/historico/page.tsx
export default function HistoricoPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [historico, setHistorico] = useState<HistoricoPedidos[]>([]);

  useObterHistoricoPedidos(setHistorico, setLoading, setError, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h1 className="text-xl font-semibold mb-6">Histórico de Compras</h1>
      {!loading && !error && (
        <div>
          {historico.map((pedido) => (
            <PedidoCard key={pedido.id} pedido={pedido} />
          ))}

          <div hidden={true} className="text-center mt-6">
            <button className="border border-orange-500 text-orange-500 px-4 py-2 rounded hover:bg-orange-50">
              Ver mais pedidos
            </button>
          </div>
        </div>
      )}

      {loading && !error && <Loading />}
    </div>
  );
}

const PedidoCard: React.FC<{ pedido: HistoricoPedidos }> = ({ pedido }) => {
  return (
    <Link href={"/historico/" + pedido.id}>
      {" "}
      <div className="border p-4 rounded-lg mb-4 flex justify-between items-center">
        <div className="flex-1">
          <div className="flex justify-between w-full items-center">
            <PedidoStatus status={pedido.status} />
            <div className="text-right font-semibold">
              {pedido.total}.00 CVE
            </div>
          </div>
          <p className="font-bold">Pedido #{pedido.id}</p>
          <p className="text-sm text-gray-500 mb-3">
            Realizado em{" "}
            {new Date(pedido.created_at).toLocaleString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </p>

          <div className="flex items-center gap-4 md:gap-2 mt-2">
            <div className="w-12 h-10 md:w-16 md:h-16 bg-gray-100 flex items-center justify-center rounded md:rounded-xl border-2 border-orange-300">
              📦
            </div>
            {pedido.produtos.slice(0, 3).map((prod) => (
              <div key={Math.random().toString(36).substr(2, 9)}>
                <p className="text-sm font-medium">{prod.nome}</p>
                <p className="text-xs text-gray-500">Quantidade: {prod.qtd}</p>
              </div>
            ))}
            {pedido.produtos.length > 3 && (
              <button
                className="flex items-center gap-1 text-xs ml-4 text-orange-500 hover:underline"
                // TODO: adicionar navegação para detalhes
              >
                <span>... +{pedido.produtos.length - 1} mais</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex gap-4 mt-4 text-sm text-[#FF7700] border-t">
            <button className="hover:underline mt-2">Ver detalhes</button>
            <button className="hover:underline hidden">
              Comprar novamente
            </button>
          </div>
        </div>

        
      </div>
    </Link>
  );
};

interface PedidoStatusProps {
  status: Status;
}

const PedidoStatus: React.FC<PedidoStatusProps> = ({ status }) => {
  if (status === "NAO PAGO") {
    return (
      <div className="text-sm font-bold bg-red-200 text-red-600 px-2 py-1 rounded w-fit mb-2">
        {status}
      </div>
    );
  } else if (status === "PAGO") {
    return (
      <div className="text-sm bg-orange-100 text-orange-600 px-2 py-1 rounded w-fit mb-2">
        {status}
      </div>
    );
  } else if (status === "EMPROCESSAMENTO") {
    return (
      <div className="text-sm bg-blue-100 text-blue-500 px-2 py-1 rounded w-fit mb-2">
        {status}
      </div>
    );
  } else {
    return (
      <div className="text-sm bg-orange-100 text-black/30 px-2 py-1 rounded w-fit mb-2">
        {status}
      </div>
    );
  }
};
