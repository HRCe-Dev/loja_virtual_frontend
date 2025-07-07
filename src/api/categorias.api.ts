import { Categoria } from "@/types/Produto";
import { url } from "./url";

//obter categorias
export const obterCategorias = async (): Promise<Categoria[]> => {
  //TODO: receber todos os atributos do servidor de um vez so e guardar no localstorage
  const res = await fetch(url + "produtos/categorias");

  const data = await res.json();

  if (!(await res.ok)) {
    throw Error(data.message);
  }

  return data as Categoria[];
};
