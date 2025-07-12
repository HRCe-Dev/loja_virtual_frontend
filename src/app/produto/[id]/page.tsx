import ProductGallery from "@/componentes/PhotoGallery";
import fetchProductDetalhes from "./produtoDetalhes.api";
import AvaliacoesPage from "./AvaliacoesPage";
import DescricaoProduto from "./DescricaoProduto";
import SeccaoMarker from "@/app/(home)/SeccaoMarker";
import { Produto } from "@/types/Produto";
import ProdutoCard from "@/componentes/ProdutoCard";
import { url } from "@/api/url";
import DetalhesProduto from "./DetalhesProduto";
import fetchProdutos from "@/api/fetchProdutos";

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
  const ProdutosSemelhantes: Produto[] = await fetchProdutos({
    tipo: "maispopulares",
    limit: 10,
  });

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

            <DetalhesProduto produto={produto} />
          </div>

          <div className="my-10 md:my-20 px-2 sm:px-6  text-left">
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
          <div className="flex md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 3xl:grid-cols-6 gap-6 w-max md:w-full">
            {ProdutosSemelhantes &&
              ProdutosSemelhantes.slice(0, 4).map((prod) => (
                <ProdutoCard key={prod.id} produto={prod} />
              ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10 px-2 md:px-10 mt-4 mb-10">
        <SeccaoMarker>Avaliações do Produto</SeccaoMarker>
        <div className="text-center">
          <AvaliacoesPage />
        </div>
      </div>
    </div>
  );
};

export default ProdutoPage;
