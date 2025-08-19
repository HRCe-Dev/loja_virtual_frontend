import { ProdutoListaGrande, ProdutoListaLg } from "@/componentes/ProdutoLista";
import ProdutoCard from "@/componentes/ProdutoCard";
import fetchProdutos from "@/api/fetchProdutos";

interface props {
  page_slug: string;
}

export default async function PageProdutos({ page_slug }: props) {
  const produtos = await fetchProdutos({
    tipo: page_slug as any,
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
