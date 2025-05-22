export interface Zona {
  id: number;
  zona: string;
  cidade: string;
  concelho: string;
  ilha: string;
  pais: string;
}

export interface Cidade {
  id: number;
  nome: string;
  concelho: string;
  ilha: string;
}
