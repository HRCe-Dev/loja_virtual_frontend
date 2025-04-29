import ProdutoCard from "@/componentes/ProdutoCard";
import BannerCarousel from "./BannerCarrosel";
import { Produto } from "@/types/Produto";
import fetchProdutosMaisVendidos from "./fetchProdutosMaisVendidos";
import { NewsletterForm } from "@/componentes/NewsletterForm";
import MenuCategorias from "@/componentes/MenuCategorias";
import SeccaoMarker from "./SeccaoMarker";

export default async function Home() {
  const produtos: Produto[] = [
    {
      id: 1,
      nome: "Produto 1",
      preco: 10.0,
      imagem_url: "/produtos/Desktop_Lenovo.jpg",
    },
    {
      id: 2,
      nome: "Produto 2",
      preco: 20.0,
      imagem_url: "/produtos/Monitor_Gaming.png",
    },
    {
      id: 3,
      nome: "Produto 3",
      preco: 30.0,
      imagem_url: "/produtos/Monitor_Gaming.png",
    },
    {
      id: 4,
      nome: "Produto 4",
      preco: 40.0,
      imagem_url: "/produtos/Monitor_Gaming.png",
    },
    {
      id: 5,
      nome: "Produto 5",
      preco: 50.0,
      imagem_url: "/produtos/Monitor_Gaming.png",
    },
    {
      id: 6,
      nome: "Produto 6",
      preco: 60.0,
      imagem_url: "/produtos/UPS CyberPower interactiva_GreenPower.png",
    },
    {
      id: 7,
      nome: "Produto 7",
      preco: 70.0,
      imagem_url: "/produtos/UPS CyberPower interactiva_GreenPower.png",
    },
    {
      id: 8,
      nome: "Produto 8",
      preco: 80.0,
      imagem_url: "/produtos/UPS CyberPower interactiva_GreenPower.png",
    },
    {
      id: 9,
      nome: "Produto 9",
      preco: 90.0,
      imagem_url: "/produtos/UPS CyberPower interactiva_GreenPower.png",
    },
    {
      id: 10,
      nome: "Produto 10",
      preco: 100.0,
      imagem_url: "/produtos/Desktop_Lenovo.jpg",
    },
  ];

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
        <div className="grid grid-cols-4 gap-4 mt-5">
          {produtos.map((prod, index) => (
            <ProdutoCard key={prod.id} produto={prod} />
          ))}
        </div>
      </div>

      {/*Produtos Mais Vendidos*/}
      <div className="mt-10">
        {/*<h1 className="inline bg-orange-500 text-gray-800 p-2 text-2xl font-bold pl-10 pr-5 left-2 rounded-r-lg">
          Produtos Mais Vendidos
        </h1>*/}
        <SeccaoMarker>Produtos Mais Vendidos</SeccaoMarker>
        <div className="grid grid-cols-4 gap-4 mt-5">
          {produtosMaisVendidos.map((prod, index) => (
            <ProdutoCard key={prod.id} produto={prod} />
          ))}
        </div>
      </div>

      <div>
        <NewsletterForm />
      </div>
    </div>
  );
}
