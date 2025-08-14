"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MetodoEnvio } from "@/types/MetodoEnvioTypes";
import { realizarCheckout, useGetMetodosEnvio } from "../checkout.api";
import Loading from "@/componentes/Loading";
import { Cidade, Zona } from "@/types/Localizacao";
import { useObterCidades, UseObterZonas } from "@/api/localizacao.api";
import { LocateFixed } from "lucide-react";
import obterMinhaLocalizacao from "@/util/obterMinhaLocalizacao";
import { GetLocalizacao } from "@/api/localizar.api";
import Moeda from "@/componentes/Moeda";

const schema = z.object({
  island: z.string().min(1, "Obrigatório"),
  city: z.coerce.number().min(1, "Obrigatório"),
  zone: z.coerce.number().min(1, "Obrigatório"),
  deliveryMethod: z.string().min(1, "Escolha um método de entrega"),
});

type FormData = z.infer<typeof schema>;

export default function DeliveryForm() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [metodosEnvio, setMetodosEnvio] = useState<MetodoEnvio[]>([]);
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [zonas, setZonas] = useState<Zona[]>([]);
  const [loadingZona, setLoadingZona] = useState<boolean>(false);

  useObterCidades(setCidades, setLoading, []);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const dados = watch();

  useGetMetodosEnvio(dados.island, setMetodosEnvio, setLoading, setError, [
    dados.island,
  ]);

  //definir zonas
  UseObterZonas(dados.city, setZonas, setLoadingZona, [dados.city]);

  const obterLocalizacao = async () => {
    setLoading(true);
    const meuLocal = await obterMinhaLocalizacao();

    if (meuLocal) {
      const zona_ = await GetLocalizacao(meuLocal);

      if (zona_) {
        setValue("island", zona_.ilha);
        const cidadeEncontrada = cidades.find(
          (city) => city.nome === zona_.cidade
        );
        if (cidadeEncontrada) {
          setValue("city", cidadeEncontrada.id);
          setValue("zone", zona_.id);
        }
      }
    }

    setLoading(false);
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    const pedido_id = await realizarCheckout({
      endereco_id: Number(data.zone),
      metodo_entrega_id: Number(data.deliveryMethod),
    });

    if (pedido_id) {
      //TODO: retirar depois, so para fase 1:
      localStorage.setItem(
        "endereco",
        JSON.stringify(zonas.find((zona) => zona.id === data.zone))
      );

      router.push("/checkout/pagamento/" + pedido_id);
    }

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
      {!loading && !error ? (
        <div className="">
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
              {[...new Set(cidades.map((cidade) => cidade.ilha))].map(
                (ilha) => (
                  <option key={ilha} value={ilha}>
                    {ilha}
                  </option>
                )
              )}
            </select>
            <p className="text-red-500 text-sm">{errors.island?.message}</p>

            <label className="block text-sm mt-4 mb-1">Cidade</label>
            <select
              {...register("city")}
              className="input w-full border border-gray-300 rounded-md px-3 py-2 "
            >
              <option value="">Selecione a cidade</option>
              {cidades
                .filter((cidade) => cidade.ilha === dados.island)
                .sort((a, b) => a.nome.localeCompare(b.nome)) // <-- ordena pelo nome
                .map((cidade) => (
                  <option key={cidade.id} value={cidade.id}>
                    {cidade.nome}
                  </option>
                ))}
            </select>
            <p className="text-red-500 text-sm">{errors.city?.message}</p>

            <label className="block text-sm mt-4 mb-1">Zona</label>
            <select
              {...register("zone")}
              className="input w-full  border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">
                {loadingZona ? "Carregando Zonas..." : "Selecione a zona"}
              </option>
              {Array.isArray(zonas) &&
                zonas
                  .sort((a, b) => a.zona.localeCompare(b.zona)) // <-- ordena pelo campo zona
                  .map((zona) => (
                    <option key={zona.id} value={zona.id}>
                      {zona.zona}
                    </option>
                  ))}
            </select>
            <p className="text-red-500 text-sm">{errors.zone?.message}</p>
          </div>
          <button
            onClick={obterLocalizacao}
            className="mt-3 mb-5  flex flex-row  mx-auto items-center gap-2 font-bold py-2 px-5 border border-dashed border-gray-300 rounded-lg text-orange-500  hover:border-solid hover:bg-blue-500 hover:text-white transition-all duration-300 "
          >
            <LocateFixed /> Usar Localização Atual
          </button>
        </div>
      ) : (
        <Loading />
      )}

      {/* Método de Entrega */}
      {!loading && !error ? (
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
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={method.id}
                    {...register("deliveryMethod")}
                    className="mt-1"
                  />
                  <div>
                    <p className="font-medium">{method.nome}</p>
                    <p className="text-sm text-gray-500">
                      Tempo estimado: {method.max_tempo_estimado} dias úteis{" "}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-sm font-semibold ${
                    method.custo === 0 ? "text-green-500" : "text-gray-800"
                  }`}
                >
                  <Moeda>{method.custo}</Moeda>
                </span>
              </label>
            ))}
          </div>

          <p className="text-red-500 text-sm mt-2">
            {errors.deliveryMethod?.message}
          </p>

          <div className="flex justify-end mt-6">
            {/* Botão */}
            <button
              type="submit"
              className="bg-orange-400 hover:bg-orange-500 text-white font-medium w-1/2 py-2 rounded-md mt-6 transition "
              disabled={loading}
            >
              Continuar para Pagamento →
            </button>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </form>
  );
}
