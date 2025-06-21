import { url } from "@/api/url";
import { ProdutoDetalhes } from "@/types/Produto";

const url_ = url + "produtos/detalhes/";

async function fetchProductDetalhes(
  produto_id: string
): Promise<ProdutoDetalhes | null> {
  try {
    const res = await fetch(url_ + produto_id);
    if (!res.ok) {
      throw Error(
        "Erro em obter detalhes do produto " +
          produto_id +
          ", code: " +
          res.status
      );
    }

    const produto = (await res.json()) as ProdutoDetalhes;
    //console.log(produto);
    return produto;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default fetchProductDetalhes;
