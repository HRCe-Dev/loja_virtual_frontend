export interface Produto {
  id: string;
  nome: string;
  preco: number;
  imagem_url: string;
  estoque?: number;
}

export interface ProdutoCarrinho extends Produto {
  qtd: number;
  updated_at: Date;
}

export interface ProdutoPromocao extends Produto {
  desconto: number;
}

export interface ProdutoDetalhes extends Produto {
  descricao?: string | null;
  promocao?: number;

  imagens: imagensProduto[];
  categoria: Categoria;
  subcategoria: Subcategoria;
}

interface imagensProduto {
  url: string;
  ordem: number;
}

interface Categoria {
  id: number;
  nome: string;
  descricao?: string;
  imagem_url?: string;
}

interface Subcategoria {
  id: number;
  nome: string;
  descricao?: string;
}

export interface Carrinho {
  produto_id: string;
  qtd: number;
}
