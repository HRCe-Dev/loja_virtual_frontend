"use client";

import {
  esvaziarCarrinho,
  adicionarCarrinho,
} from "@/app/(cliente)/carrinho/carrinho";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface btnProps {
  produto_id: string;
  styleClass?: string;
}

export const BtnComprarAgora: React.FC<btnProps> = ({
  produto_id,
  styleClass,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const onClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    setLoading(true);

    //remover todos produtos do carrinho
    const limpar = await esvaziarCarrinho();
    if (!limpar) {
      return;
    }

    //adicionar este produto
    const add = await adicionarCarrinho(produto_id, 1); //TODO: associar com qtd da pagina

    if (!add) return;

    //encaminhar para checkout
    router.push("/carrinho");
    //TODO: criar mnr de deixar o carrinho intacto e prosseguir para checkout

    setLoading(false);
  };
  return (
    <button
      className={
        styleClass
          ? styleClass
          : "w-full mt-2 bg-[#FF7700] text-white py-2 px-3 rounded-xl hover:bg-orange-300 hover:text-gray-500"
      }
      disabled={loading}
      onClick={(e) => onClick(e)}
    >
      {loading ? "Processando ..." : "Comprar Agora"}
    </button>
  );
};
