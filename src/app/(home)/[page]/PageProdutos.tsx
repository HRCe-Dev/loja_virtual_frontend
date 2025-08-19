import { ProdutoListaGrande } from "@/componentes/ProdutoLista";
import ProdutoCard from "@/componentes/ProdutoCard";
import fetchProdutos from "@/api/fetchProdutos";
import { ProdutoTipo } from "@/types/Produto";

interface props {
  page_slug: ProdutoTipo;
}

export default async function PageProdutos({ page_slug }: props) {
  const produtos = await fetchProdutos({
    tipo: page_slug,
    limit: 50,
  });

  return (
    <div>
      <div className="flex flex-col gap-10 px-4  lg:px-10 mt-4 mb-10">
        <ProdutoListaGrande>
          {produtos.map((prod) => (
            <ProdutoCard key={prod.id} produto={prod} />
          ))}
        </ProdutoListaGrande>
      </div>
    </div>
  );
}
