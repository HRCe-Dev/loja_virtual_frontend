import { Produto } from "@/types/Produto";
import Image from "next/image";
import Link from "next/link";
import Moeda from "./Moeda";
import { BtnAdicionarCarrinho2 } from "./Buttons/ButtonCarrinho";
import { BtnListaDesejo } from "./Buttons/ButtonListaDesejo";

interface ProdutoCardProps {
  produto: Produto;
}

const ProdutoCard: React.FC<ProdutoCardProps> = ({ produto }) => {
  return (
    <Link
      href={"/produto/" + produto.id}
      className="relative bg-[#F2F2F2] p-2 rounded-xl flex flex-col gap-2 group border-orange-300 hover:border hover:shadow-xl transition-shadow duration-300 max-sm:w-[200px]"
    >
      <div>
        {produto.promocao && (
          <div
            title={produto.promocao.nome}
            className="absolute top-4 max-sm:left-2 md:left-2 z-10 px-3 py-1 rounded-2xl bg-gradient-to-br from-orange-600 to-orange-400 text-white text-sm font-bold shadow-lg visible  
                animate-bounce hover:scale-105 transition-transform duration-300 ease-in-out "
          >
            <p>- {produto.promocao.desconto}%</p>
          </div>
        )}
        <div className="absolute top-2 right-2 z-20 visible md:invisible md:group-hover:visible">
          <BtnListaDesejo produto_id={produto.id} tipo={2} />
        </div>

        <div className="relative  w-full aspect-[4/3] overflow-hidden">
          <Image
            src={produto.imagem_url}
            alt={produto.nome}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
          />
        </div>
      </div>
      <div className="">
        <h2 className=" text-gray-800 line-clamp-2 min-h-[3rem]">
          {produto.nome}
        </h2>
        <div className="flex h-12 justify-between ">
          {produto.promocao ? (
            <div className="flex flex-col">
              <span className="text-gray-400 text-sm line-through mr-2">
                <Moeda>{produto.preco}</Moeda>
              </span>
              <span className="text-xl font-bold text-gray-900">
                <Moeda>
                  {produto.preco * (1 - produto.promocao.desconto / 100)}
                </Moeda>
              </span>
            </div>
          ) : (
            <span className="text-xl font-bold text-gray-900">
              <Moeda>{produto.preco}</Moeda>
            </span>
          )}

          <BtnAdicionarCarrinho2
            produto_id={produto.id}
            promocao_id={produto.promocao?.id}
          />
        </div>
      </div>
    </Link>
  );
};

export default ProdutoCard;
