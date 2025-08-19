import { obterCategorias } from "@/api/categorias.api";
import BannerCarousel from "@/componentes/Banners";
import { Banners, ProdutoTipo } from "@/types/Produto";
import { notFound } from "next/navigation";
import PageProdutos from "./PageProdutos";

interface PageProps {
  page: string;
}

interface PageType {
  titulo: string;
  slug: string;
  tipo: ProdutoTipo;
}

const pages: PageType[] = [
  { titulo: "Super Ofertas", slug: "superofertas", tipo: "promocoes" },
  { titulo: "Mais Vendidos", slug: "maisvendidos", tipo: "maisvendidos" },
  { titulo: "Novidades", slug: "novidades", tipo: "novidades" },
  { titulo: "Destaques", slug: "destaques", tipo: "destaque" },
  { titulo: "Mais Gostados", slug: "gostados", tipo: "maisgostados" },
  { titulo: "Mais Populares", slug: "populares", tipo: "maispopulares" },
];

export const revalidate = 86400; //renderizar com dados atualizados em  24horas/24horas

export async function generateStaticParams() {
  return pages.map((pag) => ({
    page: pag.slug,
  }));
}

const bannerTest: Banners[] = [
  { url: "/bannercategoria.jpeg", alt: "Banner para categoria" },
];

const Page = async ({ params }: { params: Promise<PageProps> }) => {
  const { page } = await params;

  const pag = pages.find((p) => p.slug === page);
  if (!pag) {
    notFound();
  }

  return (
    <div>
      <BannerCarousel banners={bannerTest} />

      <div></div>
      <div className="flex flex-col gap-10 px-4  lg:px-10 mt-6 mb-10">
        <h1 className="text-3xl md:text-5xl font-bold text-center text-gray-800">
          {pag.titulo}
        </h1>
      </div>

      <div>
        <PageProdutos page_slug={pag.tipo} />
      </div>
    </div>
  );
};

export default Page;
