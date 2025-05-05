"use client";

import { ProdutoCarrinho } from "@/types/Produto";
import { useState } from "react";

interface seletorProps {
  produto: ProdutoCarrinho;
  setCarrinho: React.Dispatch<React.SetStateAction<ProdutoCarrinho[]>>;
}

const SeletorQuantidade: React.FC = () => {
  const [qtd, setQtd] = useState<number>(1);

  /*  const handleIncrementarQtd = (id: string) => {
    setCarrinho((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, qtd: p.qtd + 1, updated_at: new Date() } : p
      )
    );
  };

  const handleDecrementarQtd = (id: string) => {
    setCarrinho((prev) =>
      prev.map((p) =>
        p.id === id && p.qtd > 1
          ? { ...p, qtd: p.qtd - 1, updated_at: new Date() }
          : p
      )
    );
  };*/

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setQtd((prev) => prev - 1)}
        className="bg-gray-300 text-black px-2 py-1 rounded-full hover:bg-gray-400"
      >
        −
      </button>
      <span className="min-w-[32px] text-center">{qtd}</span>
      <button
        onClick={() => setQtd((prev) => prev + 1)}
        className="bg-gray-300 text-black px-2 py-1 rounded-full hover:bg-gray-400"
      >
        +
      </button>
    </div>
  );
};

export default SeletorQuantidade;
