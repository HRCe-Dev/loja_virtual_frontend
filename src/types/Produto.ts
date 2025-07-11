export interface Produto {
  id: string;
  nome: string;
  preco: number;
  imagem_url: string;
  estoque: number;
  promocao: PromocaoCard;
}

export interface ProdutoCarrinho extends Produto {
  qtd: number;
  updated_at?: Date;
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
  imagem_url?: string;
  subcategorias?: Subcategoria[];
}

export interface Subcategoria {
  id: number;
  nome: string;
  descricao?: string;
  imagem_url?: string;
}

export interface AtributosProdutos {
  categorias: Categoria[];
  preco_min: number;
  preco_max: number;
}

export interface Carrinho {
  produto_id: string;
  qtd?: number;
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
