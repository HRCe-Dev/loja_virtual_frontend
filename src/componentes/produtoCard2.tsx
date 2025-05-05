import { Produto } from "@/types/Produto";
import Image from "next/image";
import { Heart } from "lucide-react";
import Link from "next/link";

interface ProdutoCardProps {
  produto: Produto;
}

const ProdutoCard: React.FC<ProdutoCardProps> = ({ produto }) => {
  return (
    <Link
      href={"/produto/" + produto.id}
      className="group relative w-64 px-3 flex flex-col bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:border-orange-300 hover:shadow-xl transition-shadow duration-300"
    >
      {/* Botão de Like (Lista de Desejo) */}
      <button
        className="absolute top-2 right-2 z-10 bg-white p-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        title="Adicionar à Lista de Desejos"
      >
        <Heart className="w-5 h-5 text-gray-500 hover:text-red-500" />
      </button>

      {/*Imagem */}
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={produto.imagem_url}
          alt={produto.nome}
          fill
          className="object-cover"
        />
      </div>

      {/* indicação da loja */}
      <p className="text-sm font-bold text-[#FB943E]">Vendido por HRCe</p>

      {/*Preco */}
      <h3 className="text-2xl mt-2 font-bold ">
        {produto.preco}
        <span className="text-sm">$CVE</span>
      </h3>

      {/*nome + descricao do produto */}
      <h2 className="text-xl text-gray-500 line-clamp-2 min-h-[3.5rem]">
        {produto.nome}
      </h2>

      {/*btn de comprar agora */}
      <div>
        <button className="w-full mt-2 bg-[#FB943E] text-white py-2 px-3 rounded-xl hover:bg-orange-200 hover:text-gray-500">
          Comprar Agora
        </button>
      </div>

      {/*btn de adicionar ao carrinho */}
      <div>
        <button className="w-full mt-2 mb-2 bg-blue-950 text-white py-2 px-3 rounded-xl hover:bg-blue-400">
          Adicionar ao Carrinho
        </button>
      </div>
    </Link>
  );
};

export default ProdutoCard;
