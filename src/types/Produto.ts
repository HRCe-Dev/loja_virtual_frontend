export interface Produto {
  id: number | string;
  nome: string;
  preco: number;
  imagem_url: string;
}

export interface ProdutoPromocao extends Produto {
  desconto: number;
}
