"use client";

import SeletorQuantidade from "@/componentes/SeletorQuantidade";
import { ProdutoCarrinho } from "@/types/Produto";
import { Produtos } from "@/util/produtosTeste";
import Image from "next/image";
import { useState } from "react";

function produtosCarrinho(): ProdutoCarrinho[] {
  const out = Produtos.map((prod) => {
    return { ...prod, qtd: 2, updated_at: new Date() };
  });
  return out;
}

export default function CarrinhoPage() {
  const [carrinho, setCarrinho] = useState<ProdutoCarrinho[]>(
    produtosCarrinho()
  );
  const [selecionados, setSelecionados] = useState<Set<string>>(new Set());

  const toggleSelecionado = (id: string) => {
    setSelecionados((prev) => {
      const novo = new Set(prev);
      novo.has(id) ? novo.delete(id) : novo.add(id);
      return novo;
    });
  };

  const handleRemoverSelecionados = () => {
    setCarrinho((prev) => prev.filter((p) => !selecionados.has(p.id)));
    setSelecionados(new Set());
  };

  const handleCheckoutSelecionados = () => {
    const produtos = carrinho.filter((p) => selecionados.has(p.id));
    alert("Checkout com: " + produtos.map((p) => p.nome).join(", "));
  };

  const handleComprarAgora = (produto: ProdutoCarrinho) => {
    alert(`Comprar agora: ${produto.nome}`);
  };

  const handleRemover = (id: string) => {
    setCarrinho((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAdicionarQtd = (id: string) => {
    setCarrinho((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, qtd: p.qtd + 1, updated_at: new Date() } : p
      )
    );
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Carrinho de Compras</h1>

      {carrinho.length === 0 ? (
        <p className="text-gray-600">Seu carrinho está vazio.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {carrinho.map((produto) => (
              <li
                key={produto.id}
                className="flex items-center gap-4 p-4 bg-white rounded-lg shadow border"
              >
                <input
                  type="checkbox"
                  checked={selecionados.has(produto.id)}
                  onChange={() => toggleSelecionado(produto.id)}
                />
                <div className="w-24 h-24 relative shrink-0">
                  <Image
                    src={produto.imagem_url}
                    alt={produto.nome}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{produto.nome}</h2>
                  <p>Preço: € {produto.preco.toFixed(2)}</p>
                  <p>Quantidade: {produto.qtd}</p>
                  <p className="text-sm text-gray-500">
                    Atualizado: {produto.updated_at.toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <button
                    onClick={() => handleComprarAgora(produto)}
                    className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                  >
                    Comprar Agora
                  </button>
                  {/* button
                    onClick={() => handleAdicionarQtd(produto.id)}
                    className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                  >
                    +1 Quantidade
                  </button>*/}
                  <SeletorQuantidade />
                  <button
                    onClick={() => handleRemover(produto.id)}
                    className="w-full bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                  >
                    Remover
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex gap-4">
            <button
              onClick={handleCheckoutSelecionados}
              disabled={selecionados.size === 0}
              className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
            >
              Ir para Checkout
            </button>
            <button
              onClick={handleRemoverSelecionados}
              disabled={selecionados.size === 0}
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 disabled:opacity-50"
            >
              Remover Selecionados
            </button>
          </div>
        </>
      )}
    </div>
  );
}
