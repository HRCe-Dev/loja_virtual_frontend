"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MetodoEnvio } from "@/types/MetodoEnvioTypes";
import { realizarCheckout, useGetMetodosEnvio } from "../checkout.api";
import Loading from "@/componentes/Loading";

const schema = z.object({
  island: z.string().min(1, "Obrigatório"),
  city: z.string().min(1, "Obrigatório"),
  zone: z.string().min(1, "Obrigatório"),
  deliveryMethod: z.string().min(1, "Escolha um método de entrega"),
});

type FormData = z.infer<typeof schema>;

export default function DeliveryForm() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [metodosEnvio, setMetodosEnvio] = useState<MetodoEnvio[]>([]);

  useGetMetodosEnvio(setMetodosEnvio, setLoading, setError, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    const pedido_id = await realizarCheckout({
      endereco_id: 1,
      metodo_entrega_id: Number(data.deliveryMethod),
    });

    if (pedido_id) router.push("/checkout/pagamento/" + pedido_id);

    //TODO: mostrar erros
    setError("Erro em realizar checkout");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded shadow-md w-full mx-auto"
    >
      <h2 className="text-xl font-semibold mb-4">Informações de Entrega</h2>

      {/* Endereço */}
      {!loading ? (
        <div className="border border-gray-300 p-4 rounded mb-6">
          <label className="block text-sm mb-1">País</label>
          <input
            className="input w-full border border-gray-300 rounded-md px-3 py-2 "
            value="Cabo Verde"
            readOnly
          />

          <label className="block text-sm mt-4 mb-1">Ilha</label>
          <select
            {...register("island")}
            className="input w-full border border-gray-300 rounded-md px-3 py-2 "
          >
            <option value="">Selecione a ilha</option>
            <option value="Santiago">Santiago</option>
            <option value="São Vicente">São Vicente</option>
            {/* ...adicione mais opções */}
          </select>
          <p className="text-red-500 text-sm">{errors.island?.message}</p>

          <label className="block text-sm mt-4 mb-1">Cidade</label>
          <select
            {...register("city")}
            className="input w-full border border-gray-300 rounded-md px-3 py-2 "
          >
            <option value="">Selecione a cidade</option>
            <option value="Praia">Praia</option>
            {/* ...mais opções */}
          </select>
          <p className="text-red-500 text-sm">{errors.city?.message}</p>

          <label className="block text-sm mt-4 mb-1">Zona</label>
          <select
            {...register("zone")}
            className="input w-full  border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="">Selecione a zona</option>
            <option value="tarrafal">Tarrafal</option>
            {/* ...opções dinâmicas */}
          </select>
          <p className="text-red-500 text-sm">{errors.zone?.message}</p>
        </div>
      ) : (
        <Loading />
      )}

      {/* Método de Entrega */}
      {!loading ? (
        <div className="border border-gray-300 p-4 rounded">
          <label className="block text-sm font-medium mb-2">
            Método de Entrega
          </label>

          <div className="space-y-3">
            {metodosEnvio.map((method) => (
              <label
                key={method.id}
                className="flex justify-between items-center p-3 border border-gray-300 rounded cursor-pointer"
              >
                <div className="flex items-start gap-2">
                  <input
                    type="radio"
                    value={method.id}
                    {...register("deliveryMethod")}
                    className="mt-1"
                  />
                  <div>
                    <p className="font-medium">{method.nome}</p>
                    <p className="text-sm text-gray-500">
                      Tempo estimado: {method.min_tempo_estimado} -{" "}
                      {method.max_tempo_estimado} dias úteis{" "}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-sm font-semibold ${
                    method.custo === 0 ? "text-green-500" : "text-gray-800"
                  }`}
                >
                  {method.custo}
                </span>
              </label>
            ))}
          </div>

          <p className="text-red-500 text-sm mt-2">
            {errors.deliveryMethod?.message}
          </p>
        </div>
      ) : (
        <Loading />
      )}

      <div className="flex justify-end mt-6">
        {/* Botão */}
        <button
          type="submit"
          className="bg-orange-400 hover:bg-orange-500 text-white font-medium w-1/2 py-2 rounded-md mt-6 transition "
        >
          Continuar para Pagamento →
        </button>
      </div>
    </form>
  );
}
