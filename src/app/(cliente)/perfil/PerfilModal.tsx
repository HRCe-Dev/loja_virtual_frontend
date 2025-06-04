"use client";

import { Cliente } from "@/types/Cliente";
import { Cidade, Zona } from "@/types/Localizacao";
import { useState } from "react";

interface Props {
  dadosIniciais: Cliente;
  onFechar: () => void;
  onAtualizar: (dados: Cliente) => void;
}

export default function PerfilModal({
  dadosIniciais,
  onFechar,
  onAtualizar,
}: Props) {
  const [form, setForm] = useState(dadosIniciais);
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [zonas, setZonas] = useState<Zona[]>([]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onAtualizar(form);
  }

  const selectStyle = "border border-gray-300 rounded-lg px-3 py-2";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Fundo com blur */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onFechar}
      />

      {/* Conteúdo do modal */}
      <div className="relative z-10 bg-white p-6 rounded-xl shadow-md max-w-3xl w-full mx-4">
        <h1 className="text-xl font-semibold mb-6">Editar Perfil</h1>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Primeiro Nome
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md bg-gray-100"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Apelido
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md bg-gray-100"
                value={form.aplido}
                onChange={(e) => setForm({ ...form, aplido: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data de Nascimento
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 border rounded-md bg-gray-100"
                value={form.dataNascimento}
                onChange={(e) =>
                  setForm({ ...form, dataNascimento: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Telemóvel
              </label>
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
                  value={form.telefone}
                  onChange={(e) =>
                    setForm({ ...form, telefone: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                NIF
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 border rounded-md bg-gray-100"
                value={form.nif}
                onChange={(e) =>
                  setForm({ ...form, nif: Number(e.target.value) })
                }
              />
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

/*
  <div className="hidden">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Alterar foto
              </label>
              <label
                htmlFor="foto"
                className="border border-dashed border-orange-300 bg-orange-50 text-orange-500 text-sm px-6 py-4 rounded-lg cursor-pointer w-fit hover:bg-orange-100"
              >
                📷 Alterar Foto
              </label>
              <input
                type="file"
                id="foto"
                accept=".svg,.png,.jpg,.jpeg"
                className="hidden"
                onChange={(e) =>
                  setForm({ ...form, foto: e.target.files?.[0] || null })
                }
              />
              {form.foto && (
                <p className="text-sm text-gray-600 mt-2">{form.foto.name}</p>
              )}
            </div>
*/
