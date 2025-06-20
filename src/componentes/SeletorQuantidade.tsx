"use client";

import { atualizarCarrinho } from "@/app/(cliente)/carrinho/carrinho";
import { useEffect, useRef, useState } from "react";

interface seletorProps {
  produto_id: string;
  qtd_?: number;
  setProdutoQtd?: (produto_id: string, qtd: number) => void;
  estoque?: number;
  carrinho?: boolean;
}

const SeletorQuantidade: React.FC<seletorProps> = ({
  produto_id,
  qtd_ = 1,
  estoque = 5,
  carrinho = false,
  setProdutoQtd,
}) => {
  const [qtd, setQtd] = useState<number>(qtd_);
  const [tempoDeEspera, setTempoDeEspera] = useState<NodeJS.Timeout | null>(
    null
  );

  //para prevenir do problema de executar o useefect na rederizacao da tela
  const mudouPorInteracao = useRef(false);

  const incrementar = async () => {
    if (qtd < estoque) {
      setQtd((prev) => prev + 1);
      mudouPorInteracao.current = true;
    }
    //TODO: mostrar msg que o estoque nao tem mais
  };

  const decrementar = async () => {
    if (qtd > 1) setQtd((prev) => prev - 1);
    mudouPorInteracao.current = true;
  };

  // Efeito que vai aguardar para enviar a atualização para o servidor
  useEffect(() => {
    if (!mudouPorInteracao.current || !carrinho) return;

    if (tempoDeEspera) clearTimeout(tempoDeEspera); // Limpa o timer anterior

    const timeout = setTimeout(() => {
      atualizarCarrinho(produto_id, qtd);
      if (setProdutoQtd) {
        setProdutoQtd(produto_id, qtd);
      }
      mudouPorInteracao.current = false;
    }, 1000); // Espera 1 segundo após o último clique

    setTempoDeEspera(timeout);
    return () => clearTimeout(timeout); // Limpa o timeout quando o componente for desmontado
  }, [qtd]); // Quando a quantidade muda, o efeito é executado

  return (
    <div className="flex items-center gap-2">
      <BtnQtn onClick={() => decrementar()}>-</BtnQtn>

      <span className="min-w-[32px] text-center">{qtd}</span>

      <BtnQtn onClick={() => incrementar()}>+</BtnQtn>
    </div>
  );
};

interface btnProps {
  onClick: () => void;
  children: React.ReactNode;
  disable?: boolean;
}

const BtnQtn: React.FC<btnProps> = ({ onClick, children, disable }) => {
  return (
    <button
      onClick={onClick}
      className="w-7 h-7 text-center bg-gray-300 text-black  rounded-full hover:bg-gray-400 shadow-md  group-hover:opacity-100 transition-opacity duration-300"
      disabled={disable}
    >
      {children}
    </button>
  );
};

export default SeletorQuantidade;
