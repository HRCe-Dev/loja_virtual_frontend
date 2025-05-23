import ProdutoCard from "@/componentes/ProdutoCard";
import BannerCarousel from "./BannerCarrosel";
import { Produto } from "@/types/Produto";
import fetchProdutosMaisVendidos from "./fetchProdutosMaisVendidos";
import { NewsletterForm } from "@/componentes/NewsletterForm";
import SeccaoMarker from "./SeccaoMarker";
import Promocoes from "@/componentes/Promocoes/Promocoes";
import { ProdutoListaLg } from "@/componentes/ProdutoLista";

export default async function Home() {
  const produtosMaisVendidos = (await fetchProdutosMaisVendidos()) as Produto[];

  return (
    <div>
      <BannerCarousel />
      
      {/* Produtos em Destaque */}
      <div className="flex flex-col gap-10 px-4 md:px-44 mt-4 mb-10">
        <SeccaoMarker>Produtos em Destaque</SeccaoMarker>
        <ProdutoListaLg>
          {produtosMaisVendidos.map((prod) => (
            <ProdutoCard key={prod.id} produto={prod} />
          ))}
        </ProdutoListaLg>
      </div>
    <div className="flex flex-col gap-10 mb-30 mt-4">
      {/*Produtos TOP*/}
      <div className="flex flex-col gap-10 px-4 md:px-44 mt-4 mb-10">
        {/*<h1 className="inline bg-orange-500 text-gray-800 p-2 text-2xl font-bold pl-10 pr-5 left-2 rounded-r-lg">
          Produtos TOP
        </h1>*/}
        <SeccaoMarker>Produtos TOP</SeccaoMarker>
        <ProdutoListaLg>
          {produtosMaisVendidos.map((prod) => (
            <ProdutoCard key={prod.id} produto={prod} />
          ))}
        </ProdutoListaLg>
      </div>

      {/*Produtos em Promoção */}
      <div className="flex flex-col gap-10 px-4 md:px-44 mt-4 mb-10">
        <SeccaoMarker>Produtos em Promoção</SeccaoMarker>
        <Promocoes />
      </div>

      {/*Produtos Mais Vendidos*/}
      <div className="flex flex-col gap-10 px-4 md:px-44 mt-4 mb-10">
        {/*<h1 className="inline bg-orange-500 text-gray-800 p-2 text-2xl font-bold pl-10 pr-5 left-2 rounded-r-lg">
          Produtos Mais Vendidos
        </h1>*/}
        <SeccaoMarker>Produtos Mais Vendidos</SeccaoMarker>
        <ProdutoListaLg>
          {produtosMaisVendidos.map((prod) => (
            <ProdutoCard key={prod.id} produto={prod} />
          ))}
        </ProdutoListaLg>
      </div>

      <div className="px-4 md:px-44">
        <NewsletterForm />
      </div>
    </div>
    </div>
  );
}
