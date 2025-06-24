"use client";

import { ProdutoCarrinho } from "@/types/Produto";
import { ShoppingCart } from "lucide-react";
import CarrinhoProdutoCart from "./CarrinhoProdutoCart";
import { useEffect, useState } from "react";
import { obterProdutosCarrinho, removerCarrinho } from "./carrinho";
import Loading from "@/componentes/Loading";
import Error from "@/componentes/Error";
import { useRouter } from "next/navigation";

export default function CarrinhoPage() {
  const [btnLoading, setbtnLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [carrinho, setCarrinho] = useState<ProdutoCarrinho[]>([]);
  const [total, setTotal] = useState<number>(0);
  const router = useRouter();

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

  useEffect(() => {
    setTotal(
      carrinho.reduce(
        (acc, prod) => acc + prod.preco * (prod.estoque === 0 ? 0 : prod.qtd),
        0
      )
    );
  }, [carrinho]);

  const handleComprarClick = async () => {
    setLoading(true);
    for (const prod of carrinho) {
      if (!(prod.estoque > 0)) {
        alert(
          `O produto ${prod.nome} está ESGOTADO e  será removido do carrinho.`
        );
        await removerCarrinho(prod.id);
      }
    }

    router.push("/checkout/entrega");

    setLoading(false);
  };

  const alterarQtdProduto = (produto_id: string, novaQtd: number) => {
    setCarrinho((carrinhoAtual) =>
      carrinhoAtual.map((produto) =>
        produto.id === produto_id ? { ...produto, qtd: novaQtd } : produto
      )
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex flex-row items-center justify-between border-b border-gray-300">
        <h1 className="text-2xl font-bold mb-2">Carrinho de compras</h1>
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
                setProdutoQtd={alterarQtdProduto}
              />
            ))}
        </div>
      )}

      <div className="flex flex-col sm:flex-row mt-20 border-t border-gray-300 p-5 items-center justify-between sticky bottom-0 shadow-lg z-10">
        {/* Pre checkout */}
        <div className="ml-4 sm:ml-10 w-full sm:w-auto">
          <p className="text-2xl font-bold">Total:</p>
          <p className="text-xl font-bold text-gray-500 ml-4">
            {total}
            <span>$CVE</span>
          </p>
        </div>
        <div className="w-full sm:w-auto flex justify-center sm:justify-end mt-4 sm:mt-0 sm:mr-20">
          <button
            onClick={handleComprarClick}
            className="text-xl font-bold text-white rounded-xl bg-orange-500 px-6 py-3 hover:bg-white hover:text-orange-500 border-orange-500 hover:border-2 w-full sm:w-auto"
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}
