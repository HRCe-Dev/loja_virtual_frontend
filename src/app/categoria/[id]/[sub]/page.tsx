import { obterCategorias } from "@/api/categorias.api";
import DescricaoCategoria from "../DescricaoCategoria";
import PaginaBusca from "@/app/busca/PaginaBusca";
import { SearchQuery } from "@/types/Produto";

interface PageProps {
  id: string;
  sub: string;
}

/*
export async function generateStaticParams() {
  const categorias = await obterCategorias();

  return categorias.map((cat) => ({
    id: String(cat.id),
  }));
}*/

const CategoriaPage = async ({ params }: { params: Promise<PageProps> }) => {
  const { id: categoria_id, sub: subcategoria_id } = await params;

  const subcategoria = await (await obterCategorias())
    .find((cat) => cat.id === Number(categoria_id))
    ?.subcategorias?.find((sub) => sub.id === Number(subcategoria_id));
  if (!subcategoria) {
    return null;
  }

  const filtro: Partial<SearchQuery> = {
    subcategoria: subcategoria_id,
    categoria: categoria_id,
  };

  return (
    <div>
      <div className="flex flex-col gap-10 px-4 md:px-44 mt-6 mb-10">
        <h1 className="text-3xl md:text-5xl font-bold text-center text-gray-800">
          {subcategoria.nome}
        </h1>
      </div>

      <div>
        <PaginaBusca filtro={filtro} />
      </div>
      <div className="px-4 md:px-44 mb-10 mt-20">
        <DescricaoCategoria
          titulo={subcategoria.nome}
          descricaoText={subcategoria.descricao}
        />
      </div>
    </div>
  );
};

export default CategoriaPage;
