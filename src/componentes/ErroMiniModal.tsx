"use client";

import { XCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface ErroMiniModalProps {
  error: string | null;
}

export default function ErroMiniModal({ error }: ErroMiniModalProps) {
  const [visivel, setVisivel] = useState<boolean>(true);

  useEffect(() => {
    if (error) {
      setVisivel(true); // reinicia visibilidade se novo erro
      const timeout = setTimeout(() => setVisivel(false), 20000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  if (!visivel || !error) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[51]">
      <div className="relative flex flex-col items-center gap-2 max-w-xs p-4 bg-red-100 border border-red-400 text-red-500 rounded-lg shadow-lg animate-fade-in-down">
        <XCircle className="font-bold mt-0.5 text-red-500" size={30} />
        <span className="text-xl font-bold text-center">{error}</span>

        <button
          onClick={() => {
            setVisivel(false);
          }}
          className="hover:text-white text-sm hover:bg-gray-500 px-5 py-1 rounded-2xl border border-gray-500 mt-2"
        >
          OK
        </button>
      </div>
    </div>
  );
}
