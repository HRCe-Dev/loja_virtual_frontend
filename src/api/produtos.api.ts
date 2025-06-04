import { AtributosProdutos, Categoria } from "@/types/Produto";
import { url } from "./url";
import { useEffect, useRef } from "react";

//obter categorias
const obterCategorias = async (): Promise<Categoria[]> => {
  //TODO: receber todos os atributos do servidor de um vez so e guardar no localstorage
  const res = await fetch(url + "produtos/categorias");

  const data = await res.json();

  if (!(await res.ok)) {
    throw Error(data.message);
  }

  return data as Categoria[];
};

export const useObterAtributosProdutos = (
  setAtributos: React.Dispatch<React.SetStateAction<AtributosProdutos | null>>,
  dependencies: any[]
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
