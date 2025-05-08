import { ProdutoCarrinho } from "@/types/Produto";
import { url } from "../../api/url";
import { fetchWithAuth } from "../../api/fetch_auth";

const url_ = url + "protected/carrinho";

//obter produtos do carrinho
export const obterProdutosCarrinho = async (): Promise<
  ProdutoCarrinho[] | null
> => {
  try {
    const res = await fetchWithAuth(url_);

    if (!res.ok) {
      throw Error("Erro em obter produtos do carrinho, code: " + res.status);
    }

    const produtos = (await res.json()) as ProdutoCarrinho[];
    return produtos;
  } catch (error) {
    console.error(error);
    return null;
  }
};

//adicionar no carrinho
export const adicionarCarrinho = async (
  produto_id: string,
  qtd: number
): Promise<boolean> => {
  try {
    const res = await fetchWithAuth(url_, {
      method: "POST",
      body: JSON.stringify({ produto_id, qtd }),
    });

    if (res.ok) {
      return true;
    }

    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

//remover do carrinho
export const removerdoCarrinho = async (
  produto_id: string
): Promise<boolean> => {
  try {
    const res = await fetchWithAuth(url_, {
      method: "DELETE",
      body: JSON.stringify({ produto_id }),
    });
    if (res.ok) return true;

    console.log("Erro em atualizar carrinho, code:" + res.status);
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

//atualizar carrinho
export const atualizarCarrinho = async (
  produto_id: string,
  qtd: number
): Promise<boolean> => {
  try {
    const res = await fetchWithAuth(url_, {
      method: "PUT",
      body: JSON.stringify({ produto_id, qtd }),
    });

    if (res.ok) return true;

    console.log("Erro em atualizar carrinho, code:" + res.status);
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};
