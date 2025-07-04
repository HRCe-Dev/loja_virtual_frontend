import SeccaoMarker from "../../(home)/SeccaoMarker";
import CategoriaProdutos from "./CategoriaProdutos";
import { obterCategorias } from "@/api/categorias.api";
import DescricaoCategoria from "./DescricaoCategoria";

interface PageProps {
  id: string;
}

export async function generateStaticParams() {
  const categorias = await obterCategorias();

  return categorias.map((cat) => ({
    id: String(cat.id),
  }));
}

const CategoriaPage = async ({ params }: { params: Promise<PageProps> }) => {
  const { id: categoria_id } = await params;

  const categoria = (await obterCategorias()).find(
    (cat) => cat.id === Number(categoria_id)
  );
  if (!categoria) {
    return null;
  }

  console.log(categoria);

  return (
    <div>
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
