import CategoriaProdutos from "./CategoriaProdutos";
import { obterCategorias } from "@/api/categorias.api";
import DescricaoCategoria from "./DescricaoCategoria";
import BannerCarousel from "@/componentes/Banners";
import { Banners } from "@/types/Produto";

interface PageProps {
  id: string;
}

export const revalidate = 86400; //renderizar com dados atualizados em  24horas/24horas

export async function generateStaticParams() {
  const categorias = await obterCategorias();

  return categorias.map((cat) => ({
    id: String(cat.id),
  }));
}

const bannerTest: Banners[] = [
  { url: "/bannercategoria.jpeg", alt: "Banner para categoria" },
];

const CategoriaPage = async ({ params }: { params: Promise<PageProps> }) => {
  const { id: categoria_id } = await params;

  const categoria = (await obterCategorias()).find(
    (cat) => cat.id === Number(categoria_id)
  );
  if (!categoria) {
    return null;
  }

  return (
    <div>
      {categoria.banners_categorias &&
      categoria.banners_categorias.length > 0 ? (
        <BannerCarousel banners={categoria.banners_categorias} />
      ) : (
        <BannerCarousel banners={bannerTest} />
      )}
      <div></div>
      <div className="flex flex-col gap-10 px-4 md:px-44 mt-6 mb-10">
        <h1 className="text-3xl md:text-5xl font-bold text-center text-gray-800">
          {categoria.nome}
        </h1>
      </div>

      <div>
        <CategoriaProdutos categoria={categoria} />
      </div>
      <div className="px-4 md:px-44 mb-10">
        <DescricaoCategoria
          titulo={categoria.nome}
          descricaoText={categoria.descricao}
        />
      </div>
    </div>
  );
};

export default CategoriaPage;
