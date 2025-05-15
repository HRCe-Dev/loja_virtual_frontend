"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

const schema = z.object({
  island: z.string().min(1, "Obrigatório"),
  city: z.string().min(1, "Obrigatório"),
  zone: z.string().min(1, "Obrigatório"),
  deliveryMethod: z.enum(["pickup", "mail", "home"], {
    required_error: "Escolha um método de entrega",
  }),
});

type FormData = z.infer<typeof schema>;

export default function DeliveryForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    router.push("/checkout/pagamento");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded shadow-md w-full mx-auto"
    >
      <h2 className="text-xl font-semibold mb-4">Informações de Entrega</h2>

      {/* Endereço */}
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

      {/* Método de Entrega */}
      <div className="border border-gray-300 p-4 rounded">
        <label className="block text-sm font-medium mb-2">
          Método de Entrega
        </label>

        <div className="space-y-3">
          {[
            {
              value: "pickup",
              title: "Levantar na Loja",
              time: "Tempo estimado: 1-2 dias úteis",
              price: "Grátis",
              priceColor: "text-green-500",
            },
            {
              value: "mail",
              title: "Entrega por Correio",
              time: "Tempo estimado: 3-5 dias úteis",
              price: "500 CVE",
              priceColor: "text-gray-800",
            },
            {
              value: "home",
              title: "Entrega ao Domicílio",
              time: "Tempo estimado: 1-2 dias úteis",
              price: "800 CVE",
              priceColor: "text-gray-800",
            },
          ].map((method) => (
            <label
              key={method.value}
              className="flex justify-between items-center p-3 border border-gray-300 rounded cursor-pointer"
            >
              <div className="flex items-start gap-2">
                <input
                  type="radio"
                  value={method.value}
                  {...register("deliveryMethod")}
                  className="mt-1"
                />
                <div>
                  <p className="font-medium">{method.title}</p>
                  <p className="text-sm text-gray-500">{method.time}</p>
                </div>
              </div>
              <span className={`text-sm font-semibold ${method.priceColor}`}>
                {method.price}
              </span>
            </label>
          ))}
        </div>

        <p className="text-red-500 text-sm mt-2">
          {errors.deliveryMethod?.message}
        </p>
      </div>
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
