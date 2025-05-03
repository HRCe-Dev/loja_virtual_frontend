export interface Produto {
  id: string;
  nome: string;
  preco: number;
  imagem_url: string;
}

export interface ProdutoCarrinho extends Produto {
  qtd: number;
  updated_at: Date;
}

export interface ProdutoPromocao extends Produto {
  desconto: number;
}
