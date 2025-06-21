"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clienteSchema } from "@/types/Cliente";
import { z } from "zod";

import { Cliente } from "@/types/Cliente";

interface Props {
  dadosIniciais: Cliente;
  onFechar: () => void;
  onAtualizar: (dados: Cliente) => void;
}

type ClienteFormData = z.infer<typeof clienteSchema>;

export default function PerfilModal({ dadosIniciais, onFechar, onAtualizar }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClienteFormData>({
    resolver: zodResolver(clienteSchema),
    defaultValues: {
      nome: dadosIniciais.nome,
      aplido: dadosIniciais.aplido,
      dataNascimento: dadosIniciais.dataNascimento,
      telefone: dadosIniciais.telefone,
      nif: dadosIniciais.nif,
    },
  });

  function onSubmit(data: ClienteFormData) {
    onAtualizar(data as Cliente);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={onFechar} />
      <div className="relative z-10 bg-white p-6 rounded-xl shadow-md max-w-3xl w-full mx-4">
        <h1 className="text-xl font-semibold mb-6">Editar Perfil</h1>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Primeiro Nome</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md bg-gray-100"
                {...register("nome")}
              />
              {errors.nome && <p className="text-sm text-red-500">{errors.nome.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Apelido</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md bg-gray-100"
                {...register("aplido")}
              />
              {errors.aplido && <p className="text-sm text-red-500">{errors.aplido.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento</label>
              <input
                type="date"
                className="w-full px-4 py-2 border rounded-md bg-gray-100"
                {...register("dataNascimento")}
              />
              {errors.dataNascimento && (
                <p className="text-sm text-red-500">{errors.dataNascimento.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telemóvel</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value="+238"
                  disabled
                  className="w-1/3 px-2 py-2 border rounded-md bg-gray-100 text-gray-500"
                />
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md bg-gray-100"
                  {...register("telefone")}
                />
              </div>
              {errors.telefone && <p className="text-sm text-red-500">{errors.telefone.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">NIF</label>
              <input
                type="number"
                className="w-full px-4 py-2 border rounded-md bg-gray-100"
                {...register("nif", { valueAsNumber: true })}
              />
              {errors.nif && <p className="text-sm text-red-500">{errors.nif.message}</p>}
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button
              type="button"
              onClick={onFechar}
              className="text-gray-500 px-4 py-2 rounded hover:text-gray-700"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
            >
              Atualizar Perfil
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
