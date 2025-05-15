'use client';
import { FaStar } from 'react-icons/fa';
import { useState } from 'react';
import AvaliarModal from './AvaliacoesModal';

export default function AvaliacoesPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const ratingData = [
    { stars: 5, percent: 75 },
    { stars: 4, percent: 15 },
    { stars: 3, percent: 7 },
    { stars: 2, percent: 2 },
    { stars: 1, percent: 1 },
  ];

  const [reviews, setReviews] = useState([
    {
      user: 'Maria Silva',
      date: '03 Mai, 2025',
      rating: 5,
      text: 'Cliente foi impecável. Recomendo fortemente!',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      likes: 0,
    },
    {
      user: 'João Santos',
      date: '01 Mai, 2025',
      rating: 4,
      text: 'Muito satisfeito com a compra.',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      likes: 89,
    },
  ]);

  const handlePublicar = (rating: number, message: string) => {
    const novaReview = {
      user: 'Você',
      date: new Date().toLocaleDateString('pt-PT'),
      rating,
      text: message,
      avatar: 'https://randomuser.me/api/portraits',
      likes: 0,
    };
    setReviews((prev) => [novaReview, ...prev]);
  };

  const [visible, setVisible] = useState(2);

  return (
    <section className="max-w-4xl mx-auto p-4 space-y-8">
      {/* Avaliação Geral */}
      <div className="bg-white p-6 rounded shadow flex">
        <div className='mt-6 space-y-2 w-1/2'>
          <h1 className="text-2xl font-bold mb-2 text-start ">Avaliação Geral</h1>
          <div className="flex gap-4">
            <p className="text-4xl font-bold">4.8</p>
            <div className="text-sm text-gray-500 mt-2">
              <div>
                <div className="flex text-yellow-400 text-sm">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p className="text-gray-400  text-start">de 5</p>
              </div>
  
            </div>
          </div>
          <p className='text-start text-gray-400'>Baseado em 2.394 avaliações</p>
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
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Avaliações em Destaque</h2>
        <button 
          onClick={() => setModalOpen(true)}
          className="bg-orange-400 text-white px-8 py-2 rounded hover:bg-orange-500 transition text-sm font-medium">
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
  {reviews.slice(0, visible).map((r, i) => (
    <div key={i} className="p-4 rounded-md shadow-sm space-y-2 text-sm text-start">
      <div className="flex items-center gap-3">
        <img
          src={r.avatar || 'https://via.placeholder.com/40'}
          alt={`Avatar de ${r.user}`}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div className="font-medium text-gray-800">{r.user}</div>
            <div className="text-xs text-gray-400">{r.date}</div>
          </div>
          <div className="flex text-yellow-400 text-sm">
            {[...Array(r.rating)].map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-700">{r.text}</p>
      <div className="flex items-center gap-4 text-gray-500 text-xs pt-1">
        <span>👍 Útil ({r.likes})</span>
        <button className="hover:underline">Responder</button>
      </div>
    </div>
  ))}
</div>


      {/* Botão Carregar Mais */}
      {visible < reviews.length && (
        <div className="flex justify-center">
          <button
            className="bg-orange-400 text-white px-6 py-2 rounded hover:bg-orange-500 transition text-sm font-medium"
            onClick={() => setVisible((prev) => prev + 2)}
          >
            Carregar mais avaliações
          </button>
        </div>
      )}
    </section>
  );
}
