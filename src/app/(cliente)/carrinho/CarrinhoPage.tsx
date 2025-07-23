"use client";

import { ProdutoCarrinho } from "@/types/Produto";
import { ShoppingCart } from "lucide-react";
import CarrinhoProdutoCart from "./CarrinhoProdutoCart";
import { useEffect, useState } from "react";
import { obterProdutosCarrinho, removerCarrinho } from "./carrinho";
import Loading from "@/componentes/Loading";
import Error from "@/componentes/Error";
import { useRouter } from "next/navigation";
import Moeda from "@/componentes/Moeda";
import Image from "next/image";

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
        (acc, prod) =>
          acc +
          (prod.promocao
            ? prod.preco - prod.preco * (prod.promocao.desconto / 100)
            : prod.preco) *
            (prod.estoque === 0 ? 0 : prod.qtd),
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

      <div className="flex flex-col sm:flex-row mt-20 border-t border-gray-300 p-5 items-center justify-between sticky bottom-0 shadow-lg z-10 bg-white">
        {/* Total */}
        <div className="ml-4 sm:ml-10 w-full sm:w-auto">
          <p className="text-2xl font-bold">Total:</p>
          <Moeda className="text-xl font-bold text-gray-500 ml-4">
            {total}
          </Moeda>
        </div>

        {/* Botão + Logos */}
        <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-4 mt-4 sm:mt-0 sm:mr-20">
          {/* Logos dos Métodos de Pagamento */}
          <div className="flex items-center gap-2">
            <Image
              src="/pagamento/vinti4.png"
              width={30}
              height={30}
              alt="Vinti4"
              title="Vinti4"
            />
            <Image
              src="/pagamento/visa-secure_blu_2021_dkbg.png"
              width={30}
              height={30}
              alt="Visa"
              title="Visa"
            />
            <Image
              src="/pagamento/mc_symbol.svg"
              width={30}
              height={30}
              alt="MasterCard"
              title="MasterCard"
            />
            <Image
              src="/pagamento/American_Express_Square_Logo.png"
              width={30}
              height={30}
              alt="Amex"
              title="American Express"
            />
          </div>

          {/* Botão Comprar */}
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
