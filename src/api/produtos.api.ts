import { AtributosProdutos, Categoria } from "@/types/Produto";
import { useEffect, useRef } from "react";
import { obterCategorias } from "./categorias.api";

export const useObterAtributosProdutos = (
  setAtributos: React.Dispatch<React.SetStateAction<AtributosProdutos | null>>,
  dependencies: []
) => {
  const hasRun = useRef(false);
  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const getter = async () => {
      try {
        const dados = await obterCategorias();

        setAtributos({
          categorias: dados as Categoria[],
          preco_max: 200000,
          preco_min: 100,
        });
      } catch (error) {
        console.error(error);
      }
    };

    getter();
  }, dependencies);
};
