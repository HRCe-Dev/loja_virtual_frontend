import { ProdutoListaLg } from "@/componentes/ProdutoLista";
import ProdutoCard from "@/componentes/ProdutoCard";
import Promocoes from "@/componentes/Promocoes/Promocoes";
import CategoriaNavigation from "@/componentes/Categoria/CategoriaNavigation";
import { Produto } from "@/types/Produto";
import fetchProdutosMaisVendidos from "@/app/(home)/fetchProdutosMaisVendidos";
import SeccaoMarker from "@/app/(home)/SeccaoMarker";
import DescricaoProduto from "@/app/produto/[id]/DescricaoProduto";

export default async function PaginaSubcategoria() {
  const produtosMaisVendidos = (await fetchProdutosMaisVendidos()) as Produto[];
  return (
    <div>
      {/* Produtos em Destaque */}
      <div className="flex flex-col gap-10 px-4 md:px-44 mt-4 mb-10">
        <SeccaoMarker href="/destaques">Produtos em Destaque</SeccaoMarker>
        <ProdutoListaLg>
          {produtosMaisVendidos.map((prod) => (
            <ProdutoCard key={prod.id} produto={prod} />
          ))}
        </ProdutoListaLg>
      </div>
      <div className="flex flex-col gap-10 mb-30 mt-4">
        {/*Produtos em Promoção */}
        <div className="flex flex-col gap-10 px-4 md:px-44 mt-4 mb-10">
          <Promocoes />
        </div>

        {/*Produtos Mais Vendidos*/}
        <div className="flex flex-col gap-10 px-4 md:px-44 mt-4 mb-10">
          {/*<h1 className="inline bg-orange-500 text-gray-800 p-2 text-2xl font-bold pl-10 pr-5 left-2 rounded-r-lg">
          Produtos Mais Vendidos
        </h1>*/}
          <SeccaoMarker href="/maisvendidos++">
            Produtos Mais Vendidos
          </SeccaoMarker>
          <ProdutoListaLg>
            {produtosMaisVendidos.map((prod) => (
              <ProdutoCard key={prod.id} produto={prod} />
            ))}
          </ProdutoListaLg>
        </div>

        <div className="px-4 md:px-44">
          <DescricaoProduto />
        </div>
      </div>
    </div>
  );
}
