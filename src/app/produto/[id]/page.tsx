import ProductGallery from "@/componentes/PhotoGallery";
import fetchProductDetalhes from "./produtoDetalhes.api";
import SeletorQuantidade from "@/componentes/SeletorQuantidade";
import { ShoppingCart, Truck, Repeat } from "lucide-react";
import AvaliacoesPage from "./AvaliacoesPage";
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
import { url } from "@/api/url";

interface PageProps {
  id: string;
}

export async function generateStaticParams() {
  const produtos = await fetch(url + "produtos/all").then((res) => res.json());

  return produtos.map((produto: { id: number | string }) => ({
    id: produto.id.toString(),
  }));
}

const ProdutoPage = async ({ params }: { params: Promise<PageProps> }) => {
  const { id: produto_id } = await params;
  const produto = await fetchProductDetalhes(produto_id);
  const ProdutosSemelhantes: Produto[] = await fetchProdutosMaisVendidos();

  return (
    <div className="mx-6 md:mx-10 lg:mx-20 xl:mx-40 2xl:mx-60 mt-4 mb-10">
      {produto && (
        <div>
          {/*Categoria / Subcategoria */}
          <div className="my-10 group text-lg font-bold hover:text-orange-500 transition-colors duration-200">
            <p className="text-gray-700 group-hover:text-orange-500 text-lg sm:text-xl md:text-3xl text-center md:text-left">
              {produto.categoria.nome} /{" "}
              <span className=" group-hover:text-orange-500">
                {produto.subcategoria.nome}
              </span>
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            <div className=" w-full lg:w-1/2">
              {/*Galeria */}{" "}
              <ProductGallery
                produto_id={produto.id}
                imagem_url={produto.imagem_url}
                nome={produto.nome}
              />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col gap-5 lg:mx-10 px-4 lg:my-10">
              {/*nome, preco, addlista de desejo, qtd, addcart, buynow, entrega rapida, troca e devolucoes */}
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">{produto.nome}</h1>
              <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center border-b border-gray-400 mb-4">
                <h3 className="text-xl font-bold  ">
                  {produto.preco}
                  <span className="text-sm ">$CVE</span>
                </h3>
                {/*TODO: considerar se o produto estiver em promoção*/}

                <div className="mt-2 smmt-0">
                  <BtnListaDesejo produto_id={produto.id} tipo={3} />
                </div>
              </div>

              <div className="flex flex-row flex-wrap gap-2 items-center mb-2">
                <SeletorQuantidade produto_id={produto.id} />
                <p className="text-sm md:text-xl font-bold">
                  {produto.estoque || 1} Disponível
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 ">
                <ButtonLaranja>
                  Adicionar <ShoppingCart />
                </ButtonLaranja>
                <ButtonWhite>Comprar agora</ButtonWhite>
              </div>

              <div className="mt-5 flex sm:flex-row gap-4 sm:justify-between  sm:items-center">
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

          <div className="my-10 md:my-20 px-2 sm:px-6 md:px-20 lg:px-40 xl:px-60 text-left">
            {/*Descricao*/}
            <DescricaoProduto
              descricaoText={produto ? produto.descricao : null}
            />
          </div>
        </div>
      )}

      <div className="flex flex-col gap-10 px-4 md:px-10 mt-4 mb-10">
        {/*produtos semelhantes */}

        <SeccaoMarker>Produtos Semelhantes</SeccaoMarker>
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-max md:w-full">
            {ProdutosSemelhantes &&
              ProdutosSemelhantes.slice(0, 4).map((prod) => (
                <ProdutoCard key={prod.id} produto={prod} />
              ))}
          </div>
        </div>
      </div>
      <div className="my-10">
        <SeccaoMarker>Avaliações do Produto</SeccaoMarker>
        <div className="mx-auto text-center">
          <AvaliacoesPage />
        </div>
      </div>
    </div>
  );
};

export default ProdutoPage;
