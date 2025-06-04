"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import PerfilModal from "./PerfilModal";
import AlterarPasswordModal from "./PasswordModal";
import { useObterDadosClientes } from "./perfil.api";
import { Cliente } from "@/types/Cliente";
import Loading from "@/componentes/Loading";

export default function PerfilView() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [dados, setDados] = useState<Cliente | null>(null);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalSenha, setMostrarModalSenha] = useState(false);

  useObterDadosClientes(setDados, setLoading, setError, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md relative">
      <h1 className="text-xl font-semibold mb-6">Meu perfil</h1>

      <button
        className="absolute top-4 right-4 text-orange-500 hover:text-orange-600"
        onClick={() => setMostrarModal(true)}
      >
        <Pencil size={20} />
      </button>

      {dados && !loading && !error && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500">Primeiro Nome</p>
              <p className="font-medium">{dados.nome}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Apelido</p>
              <p className="font-medium">{dados.aplido}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Data de Nascimento</p>
              <p className="font-medium">{dados.dataNascimento}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Telemóvel</p>
              <p className="font-medium">+238 {dados.telefone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">NIF</p>
              <p className="font-medium">{dados.nif}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500"></p>
              <p className="font-medium"></p>
            </div>

            {dados.zona?.id && (
              <div>
                <p className="text-sm text-gray-500">Endereço</p>
                <p className="font-medium">
                  {dados.zona?.ilha}, {dados.zona?.cidade}, {dados.zona?.ilha}
                </p>
              </div>
            )}
          </div>

          <button
            onClick={() => setMostrarModalSenha(true)}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            Alterar Password
          </button>
        </>
      )}

      {loading && !error && <Loading />}

      {error && <p>{error}</p>}

      {mostrarModalSenha && (
        <AlterarPasswordModal
          onFechar={() => setMostrarModalSenha(false)}
          onSalvar={(dados) => {
            console.log("Nova senha:", dados);
            setMostrarModalSenha(false);
          }}
        />
      )}

      {mostrarModal && dados && (
        <PerfilModal
          dadosIniciais={dados}
          onFechar={() => setMostrarModal(false)}
          onAtualizar={(novosDados) => {
            setDados(novosDados);
            setMostrarModal(false);
          }}
        />
      )}
    </div>
  );
}
