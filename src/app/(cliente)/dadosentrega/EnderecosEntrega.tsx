"use client";

import {
  ChevronLeft,
  MoreVertical,
  Home,
  Building2,
  Users,
  MapPin,
  Trash2,
} from "lucide-react";
import {
  dadosEntrega,
  removerDadoEntrega,
  useObterDadosEntrega,
} from "./dadosEntrega.api";
import { useState } from "react";
import Loading from "@/componentes/Loading";
import Error from "@/componentes/Error";
import { AdicionarEnderecoSecao } from "./AdicionarEnderecooSection";

const EnderecosEntrega: React.FC = () => {
  const [dados, setDados] = useState<dadosEntrega[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [menuAberto, setMenuAberto] = useState<number | null>(null);

  const onDelete = async (id: number) => {
    const enviar = await removerDadoEntrega(id);

    if (enviar.status) {
      window.location.reload();
    }
  };

  useObterDadosEntrega(setDados, setLoading, setError, []);

  return (
    <div
      className="min-h-screen bg-white rounded-xl p-6 lex flex-col shadow-md"
      onClick={() => {
        if (menuAberto) setMenuAberto(null);
      }}
    >
      {/* Cabeçalho */}
      <div className="flex items-center p-4 border-b">
        <ChevronLeft className="text-gray-600 mr-2" />
        <h1 className="text-lg font-semibold">Endereços de entrega</h1>
      </div>

      {/* Lista de endereços */}
      {!loading && !error && (
        <div className="flex-1 p-4 space-y-4">
          {dados.map((endereco, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-xl shadow-sm flex items-start justify-between"
            >
              <div className="flex gap-3 items-center">
                <div className="mt-1">
                  <MapPin className="text-blue-500" />
                </div>
                <div>
                  <p className="font-semibold">{endereco.titulo}</p>
                  <p className="text-sm text-gray-700">{endereco.nome}</p>
                  <p className="text-sm text-gray-700">
                    Telefone: {endereco.telefone}
                  </p>
                  <p className="text-sm text-gray-700">
                    {endereco.zona.zona} - {endereco.zona.cidade},{" "}
                    {endereco.zona.ilha}, Cabo Verde
                  </p>
                </div>
              </div>
              <MoreVertical
                className="text-gray-400 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuAberto(endereco.id);
                }}
              />
              {menuAberto === endereco.id && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10"
                >
                  <button
                    onClick={() => {
                      onDelete(endereco.id);
                      setMenuAberto(null);
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Deletar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {loading && !error && (
        <>
          <Loading /> <div className="h-10"></div>
        </>
      )}

      {error && <Error>{error}</Error>}

      {/* Botão adicionar novo endereço */}
      <div className="p-4 bg-white border-t">
        {!loading && <AdicionarEnderecoSecao />}
      </div>
    </div>
  );
};

export default EnderecosEntrega;
