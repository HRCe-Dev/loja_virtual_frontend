"use client";

import { Produto } from "@/types/Produto";
import { useListaDesejo } from "./listadesejo.api";
import ProdutoCard from "./ProdutoCard";
import { Produtos } from "@/util/produtosTeste";

export default function ListaDesejo() {
  //const { produtos, loading, erro } = useListaDesejo();

  const produtos: Produto[] = Produtos;

  //TODO: implementar checkout
  const handleComprar = (produto_id: string) => {
    alert("Implementacao do checkout futuramente");
  };

  const handleAdicionarCarrinho = (produto_id: string) => {
    alert("ja ja am t implemental");
  };

  const removerdaLista = (produto_id: string) => {
    alert("ja ja eme t implementod");
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Lista de Desejos</h1>

      {produtos.length === 0 ? (
        <p className="text-gray-600">Sua lista de desejos está vazia.</p>
      ) : (
        <ul className="space-y-1">
          {produtos.map((produto) => (
            <li key={produto.id} className="flex items-center p-4 bg-white ">
              <ProdutoCard
                handleAdicionarCarrinho={handleAdicionarCarrinho}
                handleComprar={handleComprar}
                handleRemoverListaDesejo={removerdaLista}
                produto={produto}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
