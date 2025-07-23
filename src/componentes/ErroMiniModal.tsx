"use client";

import { XCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface ErroMiniModalProps {
  error: string | null;
}

export default function ErroMiniModal({ error }: ErroMiniModalProps) {
  if (!error) return;

  const [visivel, setVisivel] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setVisivel(false), 20000); // 30 segundos
    return () => clearTimeout(timeout);
  }, []);

  if (!visivel) return null;

  return (
    <div className="fixed bottom-10 right-4 z-[51]">
      <div className="flex items-center gap-2 max-w-xs p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-lg animate-fade-in-down">
        <XCircle className="mt-0.5 text-red-500" size={20} />
        <span className="text-sm">{error}</span>
      </div>
    </div>
  );
}
