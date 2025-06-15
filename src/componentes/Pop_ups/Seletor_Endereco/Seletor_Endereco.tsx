"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useObterCidades, UseObterZonas } from "@/api/localizacao.api";
import { Cidade, Zona } from "@/types/Localizacao";
import { LocateFixed, MapPin } from "lucide-react";
import React, { useEffect, useState } from "react";
import obterMinhaLocalizacao from "@/util/obterMinhaLocalizacao";
import { GetLocalizacao } from "@/api/localizar.api";

interface SeletorEnderecoProps {
  isOpen?: boolean;
  onClose: () => void;
  onSave: (zona_id: number, endereco: string) => void;
}

const schema = z.object({
  ilha: z.string().min(1, "Obrigatório"),
  cidade_id: z.coerce.number().min(1, "Obrigatório"),
  zona_id: z.coerce.number().min(1, "Obrigatório"),
});

type FormData = z.infer<typeof schema>;

const SeletorEndereco: React.FC<SeletorEnderecoProps> = ({
  onClose,
  onSave,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [zonas, setZonas] = useState<Zona[]>([]);
  const [loadingZona, setLoadingZona] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const dados = watch();

  useObterCidades(setCidades, setLoading, []);

  UseObterZonas(dados.cidade_id, setZonas, setLoadingZona, [dados.cidade_id]);

  const obterLocalizacao = async () => {
    setLoading(true);
    const meuLocal = await obterMinhaLocalizacao();

    if (meuLocal) {
      const zona_ = await GetLocalizacao(meuLocal);

      if (zona_) {
        setValue("ilha", zona_.ilha);
        const cidadeEncontrada = cidades.find(
          (city) => city.nome === zona_.cidade
        );
        if (cidadeEncontrada) {
          setValue("cidade_id", cidadeEncontrada.id);
          setValue("zona_id", zona_.id);
        }
      }
    }

    setLoading(false);
  };

  const onSubmit = async (data: FormData) => {
    alert(JSON.stringify(data));
    onSave(
      data.zona_id,
      `${zonas.find((zo) => zo.id === Number(dados.zona_id))?.zona || ""}, ${
        cidades.find((ci) => ci.id === Number(dados.cidade_id))?.nome || ""
      }, ${dados.ilha || ""}, Cabo Verde`
    );
  };

  const selectStyle = "border border-gray-300 rounded-lg px-3 py-2";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 ">
      <div className="flex flex-col  gap-5 bg-white p-6 rounded-xl shadow-lg relative w-full max-w-md ">
        <div className="flex flex-row items-center justify-between ">
          <h1 className="text-2xl font-bold ">Selecionar Endereço</h1>
          <button
            onClick={() => onClose()}
            className="w-7 h-7  text-center text-xl font-bold  rounded-full hover:bg-gray-200"
          >
            x
          </button>
        </div>
        <div className="flex flex-col justify-center items-center gap-3">
          <div className="w-full border-dashed border-b-2 border-gray-300">
            <h3 className="flex flex-row justify-center mb-2 px-3 py-2 hover:bg-gray-200 hover:font-bold rounded-lg transition-all duration-300">
              <MapPin className="mr-2" />
              {dados.zona_id && (
                <span>{`${
                  zonas.find((zo) => zo.id === Number(dados.zona_id))?.zona ||
                  ""
                }, ${
                  cidades.find((ci) => ci.id === Number(dados.cidade_id))
                    ?.nome || ""
                }, ${dados.ilha || ""}, Cabo Verde`}</span>
              )}
            </h3>
          </div>
          <div>
            <button
              onClick={obterLocalizacao}
              className="mt-3 flex flex-row  gap-2 font-bold py-2 px-5 border border-dashed border-gray-300 rounded-lg text-orange-500  hover:border-solid hover:bg-blue-500 hover:text-white transition-all duration-300"
            >
              <LocateFixed /> Usar Localização Atual
            </button>

            {!loading ? (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col mt-10 gap-5 "
              >
                <div className="flex flex-col">
                  <label className="text-gray-700 font-bold" htmlFor="ilha">
                    Ilha
                  </label>
                  <select {...register("ilha")} className={selectStyle}>
                    <option value="">Selecione a ilha</option>
                    {[...new Set(cidades.map((cidade) => cidade.ilha))].map(
                      (ilha) => (
                        <option key={ilha} value={ilha}>
                          {ilha}
                        </option>
                      )
                    )}
                  </select>
                  <p className="text-red-500 text-sm">{errors.ilha?.message}</p>
                </div>

                <div className="flex flex-col ">
                  <label className="font-bold text-gray-700" htmlFor="cidade">
                    Cidade
                  </label>
                  <select {...register("cidade_id")} className={selectStyle}>
                    <option value="">Selecione a cidade</option>
                    {cidades
                      .filter((cidade) => cidade.ilha === dados.ilha)
                      .map((cidade) => (
                        <option key={cidade.id} value={cidade.id}>
                          {cidade.nome}
                        </option>
                      ))}
                  </select>
                  <p className="text-red-500 text-sm">
                    {errors.cidade_id?.message}
                  </p>
                </div>

                <div className="flex flex-col">
                  <label className="font-bold text-gray-700" htmlFor="zona">
                    Zona
                  </label>
                  <select {...register("zona_id")} className={selectStyle}>
                    <option value="">
                      {loadingZona ? "Carregando Zonas..." : "Selecione a zona"}
                    </option>
                    {Array.isArray(zonas) &&
                      zonas.map((zona) => (
                        <option key={zona.id} value={zona.id}>
                          {zona.zona}
                        </option>
                      ))}
                  </select>
                  <p className="text-red-500 text-sm">
                    {errors.zona_id?.message}
                  </p>
                </div>

                <button
                  onClick={() => handleSubmit}
                  className="my-6 text-white font-bold text-lg bg-orange-500 hover:text-orange-500 hover:bg-white border-orange-500 hover:border transition-colors duration-300 rounded-lg px-3 py-2"
                >
                  Confirmar o Endereço
                </button>
              </form>
            ) : (
              <div className="flex justify-center items-center mt-10">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500 border-solid"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeletorEndereco;
