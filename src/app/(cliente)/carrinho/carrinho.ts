"use client";

import fetchProdutosLista from "@/api/fetchProdutosLista";
import { Carrinho, ProdutoCarrinho } from "@/types/Produto";
import {
  adicionarCarrinhoOnline,
  atualizarCarrinhoOnline,
  esvaziarCarrinhoOnline,
  removerdoCarrinhoOnline,
} from "./carrinho.api";

export const ITEM = "carrinho";

//TODO: sincronizar com carrinho online
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

  //verificar se algum produto do carrinho nao foi retornado
  for (const item of carrinho) {
    if (!produtos.find((prod) => prod.id === item.produto_id)) {
      removerCarrinho(item.produto_id);
    }
  }

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
  qtd: number,
  promocao_id?: string
): Promise<boolean> => {
  try {
    //obter carrinho
    const carrinho = obterCarrinho();

    //verificar se produto ja esta no carrinho
    if (carrinho.some((prod) => prod.produto_id === produto_id)) return true;

    //adicionar no carrinho
    carrinho.push({ produto_id, qtd, promocao_id });

    //guardar no localstorage
    localStorage.setItem(ITEM, JSON.stringify(carrinho));

    //alert(JSON.stringify(carrinho));
    adicionarCarrinhoOnline(produto_id, qtd);

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

    //alert(JSON.stringify(novoCarrinho));
    removerdoCarrinhoOnline(produto_id);

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

    //alert(JSON.stringify(novoCarrinho));
    atualizarCarrinhoOnline(produto_id, qtd);

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

export const esvaziarCarrinho = async (): Promise<boolean> => {
  try {
    if ((await obterQtdProdutosCarrinho()) > 0) {
      localStorage.removeItem(ITEM);
      await esvaziarCarrinhoOnline(); //retorna boolean, TODO: apagar no servidor e depois local
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const obterQtdProdutosCarrinho = async (): Promise<number> => {
  const carr = await obterProdutosCarrinho();

  if (carr) {
    return carr.length;
  }

  return 0;
};
