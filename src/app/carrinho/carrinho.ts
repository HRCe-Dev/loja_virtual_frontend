import fetchProdutosLista from "@/api/fetchProdutosLista";
import { Carrinho, ProdutoCarrinho } from "@/types/Produto";

const ITEM = "carrinho";

export const obterCarrinho = (): Carrinho[] => {
  //obter carrinho
  const carrinhoStr = localStorage.getItem(ITEM);
  const carrinho: Carrinho[] = carrinhoStr ? JSON.parse(carrinhoStr) : [];
  return carrinho;
};

export const obterProdutosCarrinho = async (): Promise<
  ProdutoCarrinho[] | null
> => {
  const carrinho = obterCarrinho();

  const produtos = await fetchProdutosLista(carrinho);

  if (!produtos) return null;

  const out: ProdutoCarrinho[] = produtos.map((prod) => {
    return {
      ...prod,
      qtd: carrinho.find((item) => item.produto_id === prod.id)?.qtd || 1,
    };
  });

  return out;
};

export const adicionarCarrinho = async (
  produto_id: string,
  qtd: number
): Promise<boolean> => {
  try {
    //obter carrinho
    const carrinho = obterCarrinho();

    //verificar se produto ja esta no carrinho
    if (carrinho.some((prod) => prod.produto_id === produto_id)) return true;

    //adicionar no carrinho
    carrinho.push({ produto_id, qtd });

    //guardar no localstorage
    localStorage.setItem(ITEM, JSON.stringify(carrinho));

    alert(JSON.stringify(carrinho));

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const removerCarrinho = async (produto_id: string): Promise<boolean> => {
  try {
    //obter carrinho
    const carrinho = obterCarrinho();

    const novoCarrinho = carrinho.filter(
      (prod) => prod.produto_id !== produto_id
    );

    //salvar no local storage
    localStorage.setItem(ITEM, JSON.stringify(novoCarrinho));

    alert(JSON.stringify(novoCarrinho));

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const atualizarCarrinho = async (
  produto_id: string,
  qtd: number
): Promise<boolean> => {
  try {
    const carrinho = obterCarrinho();

    const novoCarrinho = carrinho.map((prod) =>
      prod.produto_id === produto_id ? { ...prod, qtd } : prod
    );

    //salvar
    localStorage.setItem(ITEM, JSON.stringify(novoCarrinho));

    alert(JSON.stringify(novoCarrinho));

    return true;
  } catch (error) {
    console.log(error);
    return true;
  }
};

export const verificarCarrinho = async (
  produto_id: string
): Promise<boolean> => {
  try {
    const carrinho = obterCarrinho();

    return carrinho.some((prod) => prod.produto_id === produto_id);
  } catch (error) {
    console.log(error);
    return false;
  }
};
