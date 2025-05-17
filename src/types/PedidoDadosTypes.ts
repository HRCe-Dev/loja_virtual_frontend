export interface PedidoDados1 {
  id: string;
  nomeDestino: string;
  telefoneDestino: string | null;
  endereco_id: number;
  metodo_entrega_id: number;
  total: number;
  custo_envio: number;
  status: string;
  itens_pedido: itensPedido[];
}

interface itensPedido {
  produto_id: string;
  qtd: number;
  nome: string;
  preco: number;
}
