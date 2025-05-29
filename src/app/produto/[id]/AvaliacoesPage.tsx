"use client";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import AvaliarModal from "./AvaliacoesModal";
import { fazerAvaliacao, useGetAvaliacoes } from "./avaliacoes.api";
import { useParams } from "next/navigation";
import { Avaliacoes } from "@/types/AvaliacoesTypes";
import formatDataOuHora from "@/util/formatarTimeStamp";

export default function AvaliacoesPage() {
  const params = useParams();
  const produto_id = params.id as string;
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [avaliacoes, setAvaliacoes] = useState<Avaliacoes | null>(null);

  useGetAvaliacoes(produto_id, setAvaliacoes, setLoading, setError, []);

  const ratingData = [
    { stars: 5, percent: 75 },
    { stars: 4, percent: 15 },
    { stars: 3, percent: 7 },
    { stars: 2, percent: 2 },
    { stars: 1, percent: 1 },
  ];

  const handlePublicar = async (rating: number, message: string) => {
    const publicar = await fazerAvaliacao(produto_id, rating, message);
    //setReviews((prev) => [novaReview, ...prev]);

    if (publicar) {
      //TODO: add na tela
    }
  };

  //TODO: mostrar nada para nenhuma avaliacao
  return (
    <>
      {avaliacoes && !loading && !error && (
        <section className="max-w-4xl mx-auto p-2 md:p-4 space-y-8">
          {/* Avaliação Geral */}
          <div className="bg-white p-6 rounded shadow flex">
            <div className="mt-6 space-y-2 w-1/2">
              <h1 className="text-lg md:text-2xl font-bold mb-2 text-start ">
                Avaliação Geral
              </h1>
              <div className="flex gap-4">
                <p className="text-2xl md:text-4xl font-bold">{avaliacoes.media}</p>
                <div className="text-sm text-gray-500 mt-2">
                  <div>
                    <div className="flex text-yellow-400  text-sm md:text-base">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                    <p className="text-gray-400 text-sm text-start">de 5</p>
                  </div>
                </div>
              </div>
              <p className="text-start text-sm md:text-base text-gray-400">
                Baseado em {avaliacoes.n_avaliacoes} avaliações
              </p>
            </div>

            <div className="mt-6 space-y-2 w-1/2">
              {ratingData.map((r) => (
                <div key={r.stars} className="flex items-center gap-2">
                  <span className="w-6 text-sm text-gray-600">{r.stars}</span>
                  <div className="w-full bg-gray-200 rounded h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded"
                      style={{ width: `${r.percent}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-10 text-right">
                    {r.percent}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Avaliações em Destaque */}
          <div className="flex justify-between items-center gap-4">
            <h2 className="txt-sm md:text-lg font-semibold">Avaliações em Destaque</h2>
            <button
              onClick={() => setModalOpen(true)}
              className="bg-orange-400 text-white px-3 md:px-8 py-2 rounded hover:bg-orange-500 transition text-sm font-medium"
            >
              Avaliar
            </button>
          </div>

          {/* Modal */}
          <AvaliarModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onSubmit={handlePublicar}
          />

          {/* Lista de avaliações */}
          <div className="space-y-4">
            {avaliacoes?.avaliacoes &&
              avaliacoes.avaliacoes.map((ava) => (
                <div
                  key={ava.id}
                  className="p-4 rounded-md shadow-sm space-y-2 text-sm text-start"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                      }
                      alt={`Avatar de ${ava.nome}`}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <div className="font-medium text-gray-800">
                          {ava.nome}
                        </div>
                        <div className="text-xs text-gray-400">
                          {formatDataOuHora(ava.created_at)}
                        </div>
                      </div>
                      <div className="flex text-yellow-400 text-sm">
                        {[...Array(ava.estrelas)].map((_, i) => (
                          <FaStar key={i} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700">{ava.comentario}</p>
                  <div className="flex items-center gap-4 text-gray-500 text-xs pt-1 ">
                    <span>👍 Útil ({10})</span>
                    <button className="hover:underline">Responder</button>
                  </div>
                </div>
              ))}
          </div>

          {/* Botão Carregar Mais */}
          <div className="flex justify-center">
            <button
              className="bg-orange-400 text-white px-6 py-2 rounded hover:bg-orange-500 transition text-sm font-medium"
              onClick={() => {}}
            >
              Carregar mais avaliações
            </button>
          </div>
        </section>
      )}
    </>
  );
}
