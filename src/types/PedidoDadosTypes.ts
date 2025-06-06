export type Status =
  | "NAO PAGO"
  | "PAGO"
  | "EMPROCESSAMENTO"
  | "ENVIADO"
  | "FINALIZADO";

export interface PedidoDados1 {
  id: string;
  nomeDestino: string;
  telefoneDestino: string | null;
  endereco_id: string;
  metodo_entrega_id: number;
  total: number;
  custo_envio: number;
  status: Status;
  itens_pedido: itensPedido[];
}

interface itensPedido {
  produto_id: string;
  qtd: number;
  nome: string;
  preco?: number;
}

export interface HistoricoPedidos {
  id: string;
  created_at: Date;
  status: Status;
  total: number;
  produtos: itensPedido[];
}
