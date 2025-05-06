"use client";

import {
  removerListaDesejo,
  adicionarListaDesejo,
  verifyInListaDesejo,
} from "@/app/listadesejo/listadesejo";
import { Heart, Trash } from "lucide-react";
import { useEffect, useState } from "react";

interface btnProps {
  onClick: () => void;
  title?: string;
}

interface btnLikeProps {
  produto_id: string;
  tipo?: 1 | 2 | 3;
}

export const BtnListaDesejo: React.FC<btnLikeProps> = ({
  produto_id,
  tipo = 1,
}) => {
  const [isLiked, setLiked] = useState<boolean>(false);

  useEffect(() => {
    const fetchLikedStatus = async () => {
      setLiked(await verifyInListaDesejo(produto_id));
    };
    fetchLikedStatus();
  }, []);

  const onClickLike = async () => {
    if (isLiked) {
      setLiked(!(await removerListaDesejo(produto_id)));
    } else {
      setLiked(await adicionarListaDesejo(produto_id));
    }
  };

  if (tipo === 1) {
    return (
      <button
        className=" bg-white p-1 rounded-full shadow-md  group-hover:opacity-100 transition-opacity duration-300"
        title="Adicionar à Lista de Desejos"
        onClick={() => onClickLike()}
      >
        <Heart
          className={`w-5 h-5 text-gray-500 hover:text-red-500 ${
            isLiked ? "fill-black" : ""
          }`}
        />
      </button>
    );
  } else if (tipo === 2) {
    return (
      <button
        onClick={() => onClickLike()}
        className={`absolute top-2 right-2 z-10 
  bg-white p-1 rounded-full shadow-md ${
    isLiked ? "" : "opacity-0"
  } group-hover:opacity-100 transition-opacity duration-300 `}
        title="Adicionar à Lista de Desejos"
      >
        <Heart
          className={`w-5 h-5 text-gray-500 hover:text-red-500 ${
            isLiked ? "fill-black" : ""
          }`}
        />
      </button>
    );
  } else if (tipo === 3) {
    return (
      <button
        onClick={() => onClickLike()}
        className="flex items-center justify-center gap-1 py-1 px-2 text-sm hover:bg-gray-200 hover:border-1 border-orange-500 rounded-md"
      >
        <Heart className={` ${isLiked ? "fill-black" : ""}`} />
        Adicionar Lista Desejo
      </button>
    );
  }
};


