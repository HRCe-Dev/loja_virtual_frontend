"use client";

import {
  adicionarCarrinho,
  verificarCarrinho,
} from "@/app/(cliente)/carrinho/carrinho";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface btnProps {
  produto_id: string;
  promocao_id?: string;
  qtd?: number;
  className?: string;
}

export const BtnAdicionarCarrinho: React.FC<btnProps> = ({
  produto_id,
  promocao_id,
  qtd = 1,
  className,
}) => {
  const [noCarrinho, setNoCarrinho] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

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
      setNoCarrinho(await adicionarCarrinho(produto_id, qtd, promocao_id));
    }

    setLoading(false);
  };

  if (!noCarrinho)
    return (
      <button
        className={
          className
            ? className
            : "w-full mt-2 mb-2 bg-[#265674] text-white py-2 px-3 rounded-xl hover:bg-blue-400"
        }
        onClick={(e) => onClick(e)}
        disabled={loading}
      >
        <span className="flex gap-4 justify-center">
          Adicionar <ShoppingCart />
        </span>
      </button>
    );
  else
    return (
      <button
        className="w-full mt-2 mb-2 bg-[#265674] text-white py-2 px-3 rounded-xl hover:bg-blue-400"
        disabled={loading}
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          e.preventDefault();
          router.push("/carrinho");
        }}
      >
        {/*TODO: Corrigir isto, nao pode ter link dentro de link */}
        {/*<Link href="/carrinho">Ver Carrinho</Link>*/}
        Ver Carrinho
      </button>
    );
};
