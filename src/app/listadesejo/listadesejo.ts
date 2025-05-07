import fetchProdutosLista from "@/api/fetchProdutosLista";
import { Carrinho, Produto } from "@/types/Produto";

const ITEM = "listadesejo";

const obterListaDesejo = (): string[] => {
  //obter listadesejo
  const listadesejoStr = localStorage.getItem(ITEM);
  const listadesejo: string[] = listadesejoStr
    ? JSON.parse(listadesejoStr)
    : [];
  return listadesejo;
};

export const obterProdutosListaDesejo = async (): Promise<Produto[] | null> => {
  const lista = obterListaDesejo().map((prod) => {
    return { produto_id: prod };
  });
  const produtos = await fetchProdutosLista(lista);

  return produtos;
};

export const adicionarListaDesejo = async (
  produto_id: string
): Promise<boolean> => {
  try {
    //obter listadesejo
    const listadesejo = obterListaDesejo();

    //verificar se esta na lista de desejo
    if (listadesejo.includes(produto_id)) {
      return true;
    }

    //adicionar no listadesejo
    listadesejo.push(produto_id);

    //guardar no localstorage
    localStorage.setItem(ITEM, JSON.stringify(listadesejo));

    alert(JSON.stringify(listadesejo));

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const removerListaDesejo = async (
  produto_id: string
): Promise<boolean> => {
  try {
    //obter listadesejo
    const listadesejo = obterListaDesejo();

    const novaLista = listadesejo.filter((prod) => prod !== produto_id);

    //salvar no local storage
    localStorage.setItem(ITEM, JSON.stringify(novaLista));
    alert(JSON.stringify(novaLista));

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const verifyInListaDesejo = async (
  produto_id: string
): Promise<boolean> => {
  try {
    const listadesejo = obterListaDesejo();

    return listadesejo.includes(produto_id);
  } catch (error) {
    console.log(error);
    return false;
  }
};
