import ProductGallery from "@/componentes/PhotoGallery";
import fetchProductDetalhes from "./produtoDetalhes.api";
import SeletorQuantidade from "@/componentes/SeletorQuantidade";
import { ShoppingCart, Truck, Repeat } from "lucide-react";
import {
  ButtonLaranja,
  ButtonNoBg,
  ButtonWhite,
} from "@/componentes/Buttons/Buttons";
import DescricaoProduto from "./DescricaoProduto";
import SeccaoMarker from "@/app/(home)/SeccaoMarker";
import fetchProdutosMaisVendidos from "@/app/(home)/fetchProdutosMaisVendidos";
import { Produto } from "@/types/Produto";
import ProdutoCard from "@/componentes/ProdutoCard";
import { BtnListaDesejo } from "@/componentes/Buttons/ButtonListaDesejo";
import {url } from "@/api/url"

interface PageProps {
  id: string;
}


export async function generateStaticParams() {
  const produtos = await fetch(url+"produtos/all") 
    .then(res => res.json());

  return produtos.map((produto: { id: number | string }) => ({
    id: produto.id.toString(),
  }));
}



const ProdutoPage  = async ({ params }: { params: Promise<PageProps> }) => {
  const { id: produto_id } = await params;
  const produto = await fetchProductDetalhes(produto_id);
  const ProdutosSemelhantes: Produto[] = await fetchProdutosMaisVendidos();

  return (
    <div className="mx-10">
      {produto && (
        <div>
          {/*Categoria / Subcategoria */}
          <div className="my-10 group text-lg font-bold hover:text-orange-500 transition-colors duration-200">
            <p className="text-gray-700 group-hover:text-orange-500">
              {produto.categoria.nome} /{" "}
              <span className=" group-hover:text-orange-500">
                {produto.subcategoria.nome}
              </span>
            </p>
          </div>

          <div className="flex">
            <div className="w-1/2">
              {/*Galeria */}{" "}
              <ProductGallery
                imagem_url={produto.imagem_url}
                nome={produto.nome}
              />
            </div>
            <div className="w-1/2 flex flex-col gap-5 mx-10 ">
              {/*nome, preco, addlista de desejo, qtd, addcart, buynow, entrega rapida, troca e devolucoes */}
              <h1 className="text-3xl font-bold">{produto.nome}</h1>
              <div className="flex flex-row gap-10 border-b-1 border-gray-400 mb-4 mx-2 justify-between ">
                <h3 className="text-xl font-bold  ">
                  {produto.preco}
                  <span className="text-sm ">$CVE</span>
                </h3>
                {/*TODO: considerar se o produto estiver em promoção*/}

                <div className="mr-20">
                  <BtnListaDesejo produto_id={produto.id} tipo={3} />
                </div>
              </div>

              <div className="flex flex-row  gap-2 items-center mb-2">
                <SeletorQuantidade produto_id={produto.id} />
                <p className="text-sm font-bold">
                  {produto.estoque || 1} Disponível
                </p>
              </div>

              <div className="flex flex-col gap-2 ">
                <ButtonLaranja>
                  Adicionar <ShoppingCart />
                </ButtonLaranja>
                <ButtonWhite>Comprar agora</ButtonWhite>
              </div>

              <div className="mt-5 flex mx-20 justify-between">
                <ButtonNoBg>
                  {" "}
                  <Truck /> Entrega Rápida
                </ButtonNoBg>
                <ButtonNoBg>
                  {" "}
                  <Repeat />
                  Trocas e Devolução
                </ButtonNoBg>
              </div>
            </div>
          </div>

          <div className="mx-auto text-center mt-10">
            {/*Descricao*/}
            <DescricaoProduto
              descricaoText={produto ? produto.descricao : null}
            />
          </div>
        </div>
      )}

      <div className="my-10">
        {/*produtos semelhantes */}

        <SeccaoMarker>Produtos Semelhantes</SeccaoMarker>
        <div className="grid grid-cols-4 mt-3 ">
          {ProdutosSemelhantes &&
            ProdutosSemelhantes.slice(0, 4).map((prod) => (
              <ProdutoCard key={prod.id} produto={prod} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProdutoPage;
