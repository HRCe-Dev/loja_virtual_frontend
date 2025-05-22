export interface Avaliacao {
  id: number;
  produto_id: string;
  estrelas: number;
  comentario?: string;
  nome: string;
  created_at: string;
}

export interface Avaliacoes {
  media?: number;
  n_avaliacoes?: number;
  est1?: number;
  est2?: number;
  est3?: number;
  est4?: number;
  est5?: number;
  avaliacoes: Avaliacao[];
}
