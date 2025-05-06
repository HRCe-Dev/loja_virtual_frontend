"use client";

import { ProdutoCarrinho } from "@/types/Produto";
import { Produtos } from "@/util/produtosTeste";
import { ShoppingCart } from "lucide-react";
import CarrinhoProdutoCart from "./CarrinhoProdutoCart";
import { useState } from "react";

export default function carrinhoPage() {
  const [carrinho, setCarrinho] = useState<ProdutoCarrinho[]>(
    Produtos.map((produto) => {
      return {
        ...produto,
        qtd: 5,
        estoque: 10,
        updated_at: new Date(),
      };
    })
  );

  const removerCarrinho = async (produto_id: string) => {
    setCarrinho((prev) => prev.filter((produto) => produto.id !== produto_id));
  };

  const total = carrinho.reduce((acc, prod) => acc + prod.preco * prod.qtd, 0);

  return (
    <div className="mx-10 mt-10 mb-10">
      <div className="flex flex-row items-center justify-between border-b border-gray-300">
        <h1 className="text-2xl font-bold">Carrinho de compras</h1>
        <p className="flex items-center gap-1 text-sm mr-20 font-bold text-gray-700">
          {carrinho.length} items{" "}
          <span>
            <ShoppingCart className="size-4" />
          </span>
        </p>
      </div>
      <div className="flex flex-col gap-5 mt-10 ">
        {carrinho &&
          carrinho.map((produto) => (
            <CarrinhoProdutoCart
              removerProduto={removerCarrinho}
              key={produto.id}
              produto={produto}
            />
          ))}
      </div>

      <div className="w-ful flex flex-row mt-20 border-t-4 border-gray-300 p-5 items-center  justify-between sticky bottom-0 bg-white shadow-lg z-10">
        {/*pre checkout */}
        <div className="ml-10">
          <p className="text-2xl font-bold ">Total:</p>
          <p className="text-xl font-bold text-gray-500 ml-4">
            {total}
            <span>$CVE</span>
          </p>
        </div>
        <div className="mr-20">
          <button className="text-xl font-bold text-white rounded-xl bg-orange-500 px-3 py-2 hover:bg-white hover:text-orange-500 border-orange-500 hover:border-1">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
