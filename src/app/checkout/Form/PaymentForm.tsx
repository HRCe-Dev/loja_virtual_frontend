"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useParams, useRouter } from "next/navigation";
import { FaUser, FaPhone, FaMapMarkerAlt, FaCreditCard } from "react-icons/fa";
import { HiOutlinePencil } from "react-icons/hi2";
import { useState } from "react";
import { PedidoDados1 } from "@/types/PedidoDadosTypes";
import { pagarPedido, useGetPedidoDados } from "../checkout.api";

const schema = z.object({
  paymentMethod: z.enum(["vinti4", "trasf.bancaria"], {
    required_error: "Escolha um método de pagamento",
  }),
});

type FormData = z.infer<typeof schema>;

export default function PaymentForm() {
  const params = useParams();
  const pedido_id = params?.id as string;
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pedidoData, setPedidoData] = useState<PedidoDados1 | null>(null);
  const router = useRouter();

  useGetPedidoDados(pedido_id, setPedidoData, setLoading, setError, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (formData: FormData) => {
    setLoading(true);

    if (await pagarPedido(pedido_id, formData.paymentMethod))
      router.push("/checkout/confirmacao/" + pedido_id);

    setLoading(false);
    setError("Erro em efectuar pagamento");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6 grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {/* Coluna esquerda */}
      {pedidoData && !loading && !error && (
        <>
          <div className="md:col-span-2 space-y-3 ">
            {/* Dados de Entrega */}
            <div className="bg-white p-4 rounded shadow flex justify-between">
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <FaUser className="text-gray-500" />
                  <span>{pedidoData.nomeDestino}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaPhone className="text-gray-500" />
                  <span>{pedidoData.telefoneDestino}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-gray-500" />
                  <span>
                    {"Maderalzinho"}, {"Mindelo"}, {"São Vicente"}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => router.push("/checkout/entrega")}
                className="text-orange-500 text-sm flex items-start gap-1"
              >
                <HiOutlinePencil /> Editar
              </button>
            </div>

            {/* Método de Pagamento */}
            <div className="bg-white p-4 rounded shadow space-y-3">
              <h2 className="text-base font-medium">Método de Pagamento</h2>

              <label className="flex items-center justify-between border border-gray-300 rounded p-3 cursor-pointer">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="vinti4"
                    {...register("paymentMethod")}
                  />
                  <FaCreditCard className="text-orange-500" />
                  <span>Vinti4</span>
                </div>
              </label>

              <label className="flex items-center justify-between border border-gray-300 rounded p-3 cursor-pointer">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="trasf.bancaria"
                    {...register("paymentMethod")}
                  />
                  <span>Transferência Bancária</span>
                </div>
              </label>

              <p className="text-red-500 text-sm">
                {errors.paymentMethod?.message}
              </p>
            </div>
          </div>

          {/* Coluna direita - Resumo */}
          <div className="bg-white p-4 rounded shadow space-y-4 max-w-xl">
            <h2 className="font-medium text-base">Resumo do Pedido</h2>

            <div className="text-sm text-gray-700 space-y-1">
              {pedidoData.itens_pedido.map((prod) => (
                <div key={prod.produto_id}>
                  <div className="flex justify-between">
                    <span>{prod.nome}</span>
                    <span>{prod.preco * prod.qtd}$00 CVE</span>
                  </div>
                  <div className="text-gray-500 text-xs">
                    {prod.qtd} x {prod.preco}$00 CVE
                  </div>
                </div>
              ))}
            </div>

            <hr className="border-t border-gray-300" />

            <div className="text-sm text-gray-700 space-y-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{pedidoData.total}$00 CVE</span>
              </div>
              <div className="flex justify-between">
                <span>Envio</span>
                <span>{pedidoData.custo_envio}$00 CVE </span>
              </div>
              <div className="flex justify-between">
                <span>IVA (15%)</span>
                <span>0$00 CVE</span>
              </div>
            </div>

            <hr className="border-t border-gray-300" />

            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>
                {(pedidoData.total + pedidoData.custo_envio).toFixed(0)}
                $00 CVE
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded font-semibold mt-2"
              disabled={loading}
            >
              🧾 Pagar Agora
            </button>
          </div>
        </>
      )}
    </form>
  );
}
