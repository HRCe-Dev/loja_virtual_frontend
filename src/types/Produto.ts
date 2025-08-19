export interface Produto {
  id: string;
  nome: string;
  preco: number;
  imagem_url: string;
  estoque: number;
  promocao?: PromocaoCard;
}

export interface ProdutoCarrinho extends Produto {
  qtd: number;
  updated_at?: Date;
  promocao_id?: number;
}

export interface ProdutoPromocao extends Produto {
  desconto: number;
}

export interface ProdutoDetalhes extends Produto {
  descricao?: string | null;
  imagens: imagensProduto[];
  categoria: Categoria;
  subcategoria: Subcategoria;
}

interface imagensProduto {
  url: string;
  ordem: number;
}

export interface Categoria {
  id: number;
  nome: string;
  descricao?: string;
  imagem_url?: string | null;
  banners_categorias?: Banners[];
  subcategorias?: Subcategoria[];
}

export interface Subcategoria {
  id: number;
  nome: string;
  descricao?: string;
  imagem_url?: string;
  banners_categorias?: Banners;
}

export interface AtributosProdutos {
  categorias: Categoria[];
  preco_min: number;
  preco_max: number;
}

export interface Carrinho {
  produto_id: string;
  qtd?: number;
  promocao_id?: string;
}

export interface SearchQuery {
  q?: string;
  categoria?: string;
  subcategoria?: string;
  marca?: string;
  precomin?: string;
  precomax?: string;
}

export interface PromocaoCard {
  id: string;
  nome: string;
  desconto: number;
  data_fim?: string;
}

export type ProdutoTipo =
  | "destaque"
  | "promocoes"
  | "novidades"
  | "maisvendidos"
  | "maisgostados"
  | "maispopulares";

export interface ObterProdutsQuery {
  tipo?: ProdutoTipo;
  categoria?: number;
  subcategoria?: number;
  marca?: number;
  limit?: number;
}

export interface Banners {
  url: string;
  alt?: string;
  url_mobile?: string;
  url_tablet?: string;
  blur_url?: string;
}
