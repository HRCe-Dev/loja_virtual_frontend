"use client";

import { adicionarCarrinho, verificarCarrinho } from "@/app/carrinho/carrinho";
import React, { useEffect, useState } from "react";

interface btnProps {
  produto_id: string;
}

export const BtnAdicionarCarrinho: React.FC<btnProps> = ({ produto_id }) => {
  const [noCarrinho, setNoCarrinho] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const verifyCarrinho = async () => {
      setLoading(true);
      setNoCarrinho(await verificarCarrinho(produto_id));
      setLoading(false);
    };

    verifyCarrinho();
  }, []);

  const onClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    setLoading(true);
    if (!noCarrinho) {
      setNoCarrinho(await adicionarCarrinho(produto_id, 1));
    }

    setLoading(false);
  };

  if (!noCarrinho)
    return (
      <button
        className="w-full mt-2 mb-2 bg-blue-950 text-white py-2 px-3 rounded-xl hover:bg-blue-400"
        onClick={(e) => onClick(e)}
        disabled={loading}
      >
        Adicionar ao Carrinho
      </button>
    );
  else
    return (
      <button
        className="w-full mt-2 mb-2 bg-blue-950 text-white py-2 px-3 rounded-xl hover:bg-blue-400"
        disabled={loading}
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        {/*TODO: Corrigir isto, nao pode ter link dentro de link */}
        {/*<Link href="/carrinho">Ver Carrinho</Link>*/}
        Ver Carrinho
      </button>
    );
};
