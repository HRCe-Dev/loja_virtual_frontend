import { Produto } from "@/types/Produto";
import Image from "next/image";
import Link from "next/link";
import { BtnListaDesejo } from "./Buttons/ButtonListaDesejo";
import { BtnAdicionarCarrinho } from "./Buttons/ButtonCarrinho";
import { BtnComprarAgora } from "./Buttons/ButtonComprarAgora";

interface ProdutoCardProps {
  produto: Produto;
}

const ProdutoCard: React.FC<ProdutoCardProps> = ({ produto }) => {
  return (
    <Link
      href={"/produto/" + produto.id}
      className="group relative w-full px-3 flex flex-col bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:border-orange-300 hover:shadow-xl transition-shadow duration-300"
    >
      {/* Botão de Like (Lista de Desejo) */}
      <div className="absolute top-2 right-2 z-10 visible md:invisible md:group-hover:visible">
        <BtnListaDesejo produto_id={produto.id} tipo={2} />
      </div>
      {/*Imagem */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <Image
          src={produto.imagem_url}
          alt={produto.nome}
          fill
          className="object-cover"
        />
      </div>

      {/* indicação da loja */}
      <p className="text-sm font-bold text-[#FF7700]">Vendido por HRCe</p>

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
        <BtnComprarAgora produto_id={produto.id} />
      </div>

      {/*btn de adicionar ao carrinho */}
      <div>
        <BtnAdicionarCarrinho produto_id={produto.id} />
      </div>
    </Link>
  );
};

export default ProdutoCard;
