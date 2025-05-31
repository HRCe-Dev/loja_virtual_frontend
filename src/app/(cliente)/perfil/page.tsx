'use client';

import { useState } from 'react';

export default function PerfilPage() {
  const [form, setForm] = useState({
    nome: '',
    apelido: '',
    nascimento: '',
    telefone: '',
    foto: null as File | null,
  });

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h1 className="text-xl font-semibold mb-6">Meu perfil</h1>

      <form className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Primeiro Nome
            </label>
            <input
              type="text"
              placeholder="Nome"
              className="w-full px-4 py-2 border rounded-md bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Apelido
            </label>
            <input
              type="text"
              placeholder="Apelido"
              className="w-full px-4 py-2 border rounded-md bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data de Nascimento
            </label>
            <input
              type="date"
              className="w-full px-4 py-2 border rounded-md bg-gray-100"
            />
          </div>

          <div className="flex gap-2">
            <div className="w-20">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Telemóvel
              </label>
              <input
                type="text"
                value="+238"
                disabled
                className="w-full px-2 py-2 border rounded-md bg-gray-100 text-gray-500"
              />
            </div>
            <div className="flex-1 mt-6 md:mt-0">
              <input
                type="text"
                placeholder="9504192"
                className="w-full px-4 py-2 border rounded-md bg-gray-100"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Alterar foto
          </label>
          <p className="text-xs text-gray-500 mb-6">
            Nota: Formato SVG, PNG, ou JPG (Max 4mb)
          </p>
          <label
            htmlFor="foto"
            className="border border-dashed border-orange-300 bg-orange-50 text-orange-500 text-sm px-6 py-4 rounded-lg cursor-pointer w-fit hover:bg-orange-100"
          >
            📷 Photo 1
          </label>
          <input
            type="file"
            id="foto"
            accept=".svg,.png,.jpg,.jpeg"
            className="hidden"
            onChange={(e) => setForm({ ...form, foto: e.target.files?.[0] || null })}
          />
        </div>

        <div className="text-end">
          <button
            type="submit"
            className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
          >
            Atualizar Perfil
          </button>
        </div>
      </form>
    </div>
  );
}
