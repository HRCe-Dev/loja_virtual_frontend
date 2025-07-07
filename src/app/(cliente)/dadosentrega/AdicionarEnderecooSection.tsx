"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Plus, MapPin, X, Save } from "lucide-react";
import SeletorEndereco from "@/componentes/Pop_ups/Seletor_Endereco/Seletor_Endereco";
import { adicionarDadosEntrega } from "./dadosEntrega.api";
import Loading from "@/componentes/Loading";

// Schema Zod
const schema = z.object({
  titulo: z.string().min(1, "Título é obrigatório"),
  nome: z.string().min(1, "Nome é obrigatório"),
  telefone: z
    .string()
    .min(7, "Telefone inválido")
    .max(20, "Telefone muito longo"),
});

type EnderecoForm = z.infer<typeof schema>;

export function AdicionarEnderecoSecao() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [zona_id, setZona_id] = useState<number | null>(null);
  const [endereco, setEndereco] = useState<string | null>(null);
  const [modal, setModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnderecoForm>({
    resolver: zodResolver(schema),
  });

  const cancelar = () => {
    reset();
    setMostrarFormulario(false);
  };

  const guardar = async (data: EnderecoForm) => {
    try {
      if (!zona_id) {
        return alert("Deve selecionar um endereço");
      }

      setLoading(true);
      await adicionarDadosEntrega({ ...data, zonaId: zona_id });
      cancelar();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {!mostrarFormulario && (
        <button
          type="button"
          onClick={() => setMostrarFormulario(true)}
          className="w-full bg-orange-500 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-orange-600 transition"
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Endereço
        </button>
      )}

      {mostrarFormulario &&
        (!loading ? (
          <form
            onSubmit={handleSubmit(guardar)}
            className="border rounded-xl p-4 space-y-4 shadow-sm bg-white"
          >
            <div className="space-y-2">
              <label htmlFor="titulo" className="text-sm font-medium">
                Título
              </label>
              <input
                id="titulo"
                type="text"
                {...register("titulo")}
                placeholder="Ex: Casa, Escritório"
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
              <p className="text-red-500 text-sm">{errors.titulo?.message}</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="nome" className="text-sm font-medium">
                Nome
              </label>
              <input
                id="nome"
                type="text"
                {...register("nome")}
                placeholder="Nome do destinatário"
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
              <p className="text-red-500 text-sm">{errors.nome?.message}</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="telefone" className="text-sm font-medium">
                Telefone
              </label>
              <input
                id="telefone"
                type="tel"
                {...register("telefone")}
                placeholder="+238 9XX XX XX"
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
              <p className="text-red-500 text-sm">{errors.telefone?.message}</p>
            </div>

            <div className="space-y-2">
              {endereco && (
                <p className="flex flex-row mb-5 px-3 py-2 hover:bg-gray-200 hover:font-bold rounded-lg transition-all duration-300">
                  <MapPin className="mr-2" />
                  <span>{endereco}</span>
                </p>
              )}
            </div>

            <div className="flex mt-4">
              <button
                type="button"
                onClick={() => setModal(true)}
                className="flex items-center px-4 py-2 border rounded-md text-sm hover:bg-gray-100"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Selecionar Localização
              </button>
            </div>

            <div className="flex justify-center mt-4 space-x-2 pt-2">
              <button
                type="button"
                onClick={cancelar}
                className="flex items-center px-4 py-2 rounded-md text-sm border hover:bg-gray-100"
              >
                <X className="w-4 h-4 mr-1" />
                Cancelar
              </button>
              <button
                type="submit"
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
              >
                <Save className="w-4 h-4 mr-1" />
                Guardar
              </button>
            </div>

            {modal && (
              <SeletorEndereco
                isOpen={modal}
                onClose={() => setModal(false)}
                onSave={(zona_id: number, endereco: string) => {
                  setZona_id(zona_id);
                  setEndereco(endereco);
                  setModal(false);
                }}
              />
            )}
          </form>
        ) : (
          <Loading />
        ))}
    </div>
  );
}
