import { Produto } from "@/types/Produto";
import Image from "next/image";

interface ProdutoCardProps {
  produto: Produto;
  handleComprar: (produto_id: string) => void;
  handleAdicionarCarrinho: (produto_id: string) => void;
  handleRemoverListaDesejo: (produto_id: string) => void;
}

const ProdutoCard: React.FC<ProdutoCardProps> = ({
  produto,
  handleComprar,
  handleAdicionarCarrinho,
  handleRemoverListaDesejo,
}) => {
  return (
    <div className="flex items-center gap-6 p-4 bg-white rounded-xl shadow border w-full">
      {/* Imagem */}
      <div className="w-24 h-24 relative shrink-0">
        <Image
          src={produto.imagem_url}
          alt={produto.nome}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      {/* Detalhes */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold">{produto.nome}</h2>
        <p className="text-gray-700">
          {" "}
          {produto.preco}
          <span className="text-sm">$CVE</span>{" "}
        </p>
      </div>

      {/* Ações */}
      <div className="flex flex-col gap-2">
        <button
          onClick={() => handleComprar(produto.id)}
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          Comprar
        </button>
        <button
          onClick={() => handleAdicionarCarrinho(produto.id)}
          className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
        >
          Adicionar ao Carrinho
        </button>
        <button
          onClick={() => handleRemoverListaDesejo(produto.id)}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
        >
          Remover
        </button>
      </div>
    </div>
  );
};

export default ProdutoCard;
