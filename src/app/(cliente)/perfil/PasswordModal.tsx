"use client";

import { useState } from "react";
import { alterarPassword } from "./perfil.api";

interface Props {
  onFechar: () => void;
  onSalvar: (dados: { atual: string; nova: string; confirmar: string }) => void;
}

export default function AlterarPasswordModal({ onFechar, onSalvar }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  //TODO: usar react forms com validacao zod
  const [form, setForm] = useState({
    atual: "",
    nova: "",
    confirmar: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    if (form.nova === form.confirmar) {
      const enviar = await alterarPassword(form.atual, form.nova);
      if (enviar) {
        onSalvar(form);
      } else {
        setError("Erro em alterar Password");
      }
    }
    setError("Password e Confirmar Password são diferentes");

    setLoading(false);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) onFechar();
      }}
    >
      {/* Fundo turvo */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative z-10 bg-white p-6 rounded-2xl shadow-md w-full max-w-sm mx-4">
        {/* Cabeçalho */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Alterar sua password</h2>
          <button
            onClick={onFechar}
            className="text-gray-400 hover:text-black text-xl"
          >
            &times;
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Antiga password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 bg-gray-100 rounded-md"
              value={form.atual}
              onChange={(e) => setForm({ ...form, atual: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Nova password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 bg-gray-100 rounded-md"
              value={form.nova}
              onChange={(e) => setForm({ ...form, nova: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Confirmar password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 bg-gray-100 rounded-md"
              value={form.confirmar}
              onChange={(e) => setForm({ ...form, confirmar: e.target.value })}
            />
          </div>

          {error && <p className="text-red-800">{error}</p>}

          <button
            type="submit"
            className="w-full bg-orange-400 text-white font-semibold py-2 rounded-md hover:bg-orange-500"
            disabled={loading}
          >
            {!loading ? "Atualizar Password" : "Enviando..."}
          </button>
        </form>
      </div>
    </div>
  );
}
