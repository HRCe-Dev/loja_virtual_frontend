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
      <BtnQtn onClick={() => setQtd((prev) => prev - 1)}>-</BtnQtn>

      <span className="min-w-[32px] text-center">{qtd}</span>

      <BtnQtn onClick={() => setQtd((prev) => prev + 1)}>+</BtnQtn>
    </div>
  );
};

interface btnProps {
  onClick: () => void;
  children: React.ReactNode;
}

const BtnQtn: React.FC<btnProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="w-7 h-7 text-center bg-gray-300 text-black  rounded-full hover:bg-gray-400 shadow-md  group-hover:opacity-100 transition-opacity duration-300"
    >
      {children}
    </button>
  );
};

export default SeletorQuantidade;
