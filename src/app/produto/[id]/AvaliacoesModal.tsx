'use client';
import { FaStar } from 'react-icons/fa';
import { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, message: string) => void;
}

export default function AvaliarModal({ isOpen, onClose, onSubmit }: ModalProps) {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/10  flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">DEIXA SUA OPINIÃO</h2>

        {/* Classificação */}
        <label className="block text-sm mb-1 font-medium">Classificação</label>
        <div className="flex items-center gap-2 border rounded px-4 py-2 mb-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <FaStar
              key={i}
              onClick={() => setRating(i)}
              className={`cursor-pointer text-xl ${
                i <= rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
          <span className="text-sm text-gray-600">{rating} classificação por estrela</span>
        </div>

        {/* Opinião */}
        <label className="block text-sm mb-1 font-medium">Opinião</label>
        <textarea
          className="w-full border rounded px-3 py-2 mb-4 text-sm text-gray-800"
          rows={4}
          placeholder="Escreva aqui sua experiência..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Botões */}
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="text-sm text-gray-500 hover:underline">
            Cancelar
          </button>
          <button
            className="bg-orange-500 text-white px-5 py-2 rounded font-semibold text-sm hover:bg-orange-600"
            onClick={() => {
              onSubmit(rating, text);
              onClose();
              setText('');
              setRating(5);
            }}
          >
            PUBLICAR
          </button>
        </div>
      </div>
    </div>
  );
}
