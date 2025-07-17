import { ProdutoListaLg } from "@/componentes/ProdutoLista";
import SeccaoMarker from "../../(home)/SeccaoMarker";
import ProdutoCard from "@/componentes/ProdutoCard";
import { Categoria} from "@/types/Produto";
import CategoriaNavigationClient from "@/componentes/Categoria/CategoriaNavigationClient";
import fetchProdutos from "@/api/fetchProdutos";

interface props {
  categoria: Categoria;
}

export default async function CategoriaProdutos({ categoria }: props) {
  const produtosMaisVendidos = await fetchProdutos({
    tipo: "maisvendidos",
    limit: 10,
    categoria: categoria.id,
  });
  const produtosMaisPopulares = await fetchProdutos({
    tipo: "maispopulares",
    limit: 10,
    categoria: categoria.id,
  });
  const novidades = await fetchProdutos({
    tipo: "novidades",
    limit: 10,
    categoria: categoria.id,
  });
  const promocoes = await fetchProdutos({
    tipo: "promocoes",
    limit: 10,
    categoria: categoria.id,
  });

  return (
    <div>
      <div className="flex flex-col gap-10 px-4 md:px-44 mt-4 mb-5">
        <SeccaoMarker>Subcategorias</SeccaoMarker>
      </div>
      {categoria.subcategorias && (
        <CategoriaNavigationClient
          categorias={categoria.subcategorias}
          link={`categoria/${categoria.id}`}
        />
      )}

      {/* Produtos em Destaque */}
      <div className="flex flex-col gap-10 px-4 md:px-44 mt-4 mb-10">
        <SeccaoMarker href="/destaques">
          Novidades de {categoria.nome}
        </SeccaoMarker>
        <ProdutoListaLg>
          {novidades.map((prod) => (
            <ProdutoCard key={prod.id} produto={prod} />
          ))}
        </ProdutoListaLg>
      </div>
      <div className="flex flex-col gap-10 mb-30 mt-4">
        {promocoes.length > 1 && (
          <div className="flex flex-col gap-10 px-4 md:px-44 mt-4 mb-10">
            <SeccaoMarker href="/promocoes">
              Promoções em {categoria.nome}
            </SeccaoMarker>
            <ProdutoListaLg>
              {promocoes.map((prod) => (
                <ProdutoCard key={prod.id} produto={prod} />
              ))}
            </ProdutoListaLg>
          </div>
        )}

        <div className="flex flex-col gap-10 px-4 md:px-44 mt-4 mb-10">
          <SeccaoMarker href="/maisvendidos++">
            Produtos Mais Vendidos
          </SeccaoMarker>
          <ProdutoListaLg>
            {produtosMaisVendidos.map((prod) => (
              <ProdutoCard key={prod.id} produto={prod} />
            ))}
          </ProdutoListaLg>
        </div>

        {/*Produtos Mais Vendidos*/}
        <div className="flex flex-col gap-10 px-4 md:px-44 mt-4">
          <SeccaoMarker href="/populares">
            Populares de {categoria.nome}
          </SeccaoMarker>
          <ProdutoListaLg>
            {produtosMaisPopulares.map((prod) => (
              <ProdutoCard key={prod.id} produto={prod} />
            ))}
          </ProdutoListaLg>
        </div>
      </div>
    </div>
  );
}
