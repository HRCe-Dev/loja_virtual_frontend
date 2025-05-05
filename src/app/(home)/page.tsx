import ProdutoCard from "@/componentes/produtoCard2";
import BannerCarousel from "./BannerCarrosel";
import { Produto } from "@/types/Produto";
import fetchProdutosMaisVendidos from "./fetchProdutosMaisVendidos";
import { NewsletterForm } from "@/componentes/NewsletterForm";
import MenuCategorias from "@/componentes/MenuCategorias";
import SeccaoMarker from "./SeccaoMarker";
import Promocoes from "@/componentes/Promocoes/Promocoes";
import { Produtos } from "@/util/produtosTeste";
import { ProdutoListaLg } from "@/componentes/ProdutoLista";

export default async function Home() {
  const produtos: Produto[] = Produtos;

  const produtosMaisVendidos = (await fetchProdutosMaisVendidos()) as Produto[];

  return (
    <div className="flex flex-col gap-10 mb-30 mx-10 mt-4">
      <MenuCategorias />
      <h1 className="font-bold text-center text-xl text-gray-600">
        A SUA MELHOR ESCOLHA COMEÇA AQUI
      </h1>
      <BannerCarousel />

      {/*Produtos TOP*/}
      <div className="mt-10">
        {/*<h1 className="inline bg-orange-500 text-gray-800 p-2 text-2xl font-bold pl-10 pr-5 left-2 rounded-r-lg">
          Produtos TOP
        </h1>*/}
        <SeccaoMarker>Produtos TOP</SeccaoMarker>
        <ProdutoListaLg>
          {produtos.map((prod) => (
            <ProdutoCard key={prod.id} produto={prod} />
          ))}
        </ProdutoListaLg>
      </div>

      {/*Produtos em Promoção */}
      <div className="mt-10">
        <SeccaoMarker>Produtos em Promoção</SeccaoMarker>
        <Promocoes />
      </div>

      {/*Produtos Mais Vendidos*/}
      <div className="mt-10">
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

      <div>
        <NewsletterForm />
      </div>
    </div>
  );
}
