"use client";

import { PedidoDados1 } from "@/types/PedidoDadosTypes";
import Moeda from "./Moeda";
type Props = {
  pedidoData: PedidoDados1;
};

export default function ResumoPedido({ pedidoData }: Props) {
  return (
    <>
      <h3 className="text-orange-500 font-semibold mb-3">Resumo do Pedido</h3>

      <div className="border rounded-md divide-y mb-6">
        {Array.isArray(pedidoData?.itens_pedido) &&
          pedidoData.itens_pedido.map((prod) => (
            <div key={prod.produto_id} className="flex items-center gap-4 p-4">
              <div className="w-14 h-14 bg-gray-100 rounded-md overflow-hidden">
                <img src={prod.imagem_url} alt={prod.nome} />
              </div>
              <div className="flex-1">
                <p className="font-medium">{prod.nome}</p>
                <Moeda className="text-sm text-gray-500">
                  {prod.preco} x {prod.qtd}
                </Moeda>
              </div>
              <p className="font-medium">
                <Moeda>{prod.preco! * prod.qtd}</Moeda>
              </p>
            </div>
          ))}
      </div>

      <div className="text-sm text-gray-700 space-y-1 mb-6">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>
            <Moeda>{pedidoData.total}</Moeda>
          </span>
        </div>
        <div className="flex justify-between">
          <span>Frete</span>
          <span>
            <Moeda>{pedidoData.custo_envio}</Moeda>
          </span>
        </div>
        <div className="flex justify-between font-semibold text-base mt-2">
          <span>Total</span>
          <span>
            {" "}
            <Moeda>{pedidoData.custo_envio + pedidoData.total}</Moeda>
          </span>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-700">
        <p className="font-semibold mb-1">Endereço de Entrega</p>
        <p>{pedidoData.nomeDestino}</p>
        <p>{pedidoData.telefoneDestino}</p>
        <br />
        <p>{pedidoData.endereco || ""}</p>
      </div>
    </>
  );
}
