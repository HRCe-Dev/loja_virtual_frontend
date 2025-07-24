import { Produto } from "@/types/Produto";
import Image from "next/image";
import Link from "next/link";
import { BtnListaDesejo } from "./Buttons/ButtonListaDesejo";
import { BtnAdicionarCarrinho } from "./Buttons/ButtonCarrinho";
import { BtnComprarAgora } from "./Buttons/ButtonComprarAgora";
import Moeda from "./Moeda";

interface ProdutoCardProps {
  produto: Produto;
}

const ProdutoCard2: React.FC<ProdutoCardProps> = ({ produto }) => {
  return (
    <Link
      href={"/produto/" + produto.id}
      className="group relative flex flex-row md:flex-col w-full px-3 bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:border-orange-300 hover:shadow-xl transition-shadow duration-300"
    >
      {/* Promoção */}
      {produto.promocao && (
        <div
          title={produto.promocao.nome}
          className="absolute top-2 left-2 z-10 px-2 py-1 rounded-2xl bg-gradient-to-br from-red-600 to-red-400 text-white text-xs font-bold shadow-lg
          group-hover:invisible md:group-hover:visible animate-bounce hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          <p>- {produto.promocao.desconto}%</p>
        </div>
      )}

      {/* Botão de Like (Lista de Desejo) */}
      <div className="absolute top-2 right-2 z-20 visible md:invisible md:group-hover:visible">
        <BtnListaDesejo produto_id={produto.id} tipo={2} />
      </div>

      {/* Imagem */}
      <div className="relative flex-shrink-0 w-1/3 md:w-full aspect-[4/3] md:aspect-[4/3] overflow-hidden">
        <Image
          src={produto.imagem_url}
          alt={produto.nome}
          fill
          className="object-cover"
        />
      </div>

      {/* Conteúdo */}
      <div className="flex flex-col justify-between p-3 w-2/3 md:w-full">
        {/* Loja */}
        <p className="text-sm font-bold text-[#FF7700]">Vendido por HRCe</p>

        {/* Preço */}
        {produto.promocao ? (
          <div className="flex flex-col ">
            <div className="line-through">
              <Moeda className=" text-gray-400 text-xs">{produto.preco}</Moeda>
            </div>
            <Moeda className="text-xl  font-bold">
              {produto.preco * (1 - produto.promocao.desconto / 100)}
            </Moeda>
          </div>
        ) : (
          <Moeda className="text-2xl mt-4 font-bold">{produto.preco}</Moeda>
        )}

        {/*nome + descricao do produto */}
        <h2 className="text-xl text-gray-500 line-clamp-2 min-h-[3.5rem]">
          {produto.nome}
        </h2>

        {/* Botões */}
        <div className="">
          <BtnComprarAgora
            produto_id={produto.id}
            promocao_id={produto.promocao?.id}
          />
          <BtnAdicionarCarrinho
            produto_id={produto.id}
            promocao_id={produto.promocao?.id}
          />
        </div>
      </div>
    </Link>
  );
};

export default ProdutoCard2;
