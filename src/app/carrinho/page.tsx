"use client";

import { ProdutoCarrinho } from "@/types/Produto";
import { ShoppingCart } from "lucide-react";
import CarrinhoProdutoCart from "./CarrinhoProdutoCart";
import { useEffect, useState } from "react";
import { obterProdutosCarrinho, removerCarrinho } from "./carrinho";
import Loading from "@/componentes/Loading";
import Error from "@/componentes/Error";
import Link from "next/link";

export default function CarrinhoPage() {
  const [btnLoading, setbtnLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [carrinho, setCarrinho] = useState<ProdutoCarrinho[]>([]);
  /*const [carrinho, setCarrinho] = useState<ProdutoCarrinho[]>(
    Produtos.map((produto) => {
      return {
        ...produto,
        qtd: 5,
        estoque: 10,
        updated_at: new Date(),
      };
    })
  );*/

  useEffect(() => {
    const fetchCarrinho = async () => {
      setLoading(true);
      const produtos = await obterProdutosCarrinho();
      if (produtos) setCarrinho(produtos);
      else setError(true);
      setLoading(false);
    };

    fetchCarrinho();
  }, []);

  const onClickRemover = async (produto_id: string) => {
    setbtnLoading(true);
    if (await removerCarrinho(produto_id)) {
      setCarrinho((prev) =>
        prev.filter((produto) => produto.id !== produto_id)
      );
    }

    setbtnLoading(false);
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
      {loading && <Loading />}

      {!loading && error && <Error />}

      {!loading && !error && (
        <div className="flex flex-col gap-5 mt-10 ">
          {carrinho &&
            carrinho.map((produto) => (
              <CarrinhoProdutoCart
                removerProduto={onClickRemover}
                btnLoading={btnLoading}
                key={produto.id}
                produto={produto}
              />
            ))}
        </div>
      )}

      <div className="flex flex-col sm:flex-row mt-20 border-t-4 border-gray-300 p-5 items-center justify-between sticky bottom-0 bg-white shadow-lg z-10">
        {/* Pre checkout */}
        <div className="ml-4 sm:ml-10 w-full sm:w-auto">
          <p className="text-2xl font-bold">Total:</p>
          <p className="text-xl font-bold text-gray-500 ml-4">
            {total}
            <span>$CVE</span>
          </p>
        </div>
        <div className="w-full sm:w-auto flex justify-center sm:justify-end mt-4 sm:mt-0 sm:mr-20">
          <button className="text-xl font-bold text-white rounded-xl bg-orange-500 px-6 py-3 hover:bg-white hover:text-orange-500 border-orange-500 hover:border-2 w-full sm:w-auto">
            <Link href="/checkout/entrega">Checkout</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
