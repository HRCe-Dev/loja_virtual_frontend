export interface Cliente {
  nome: string;
  aplido: string;
  dataNascimento?: string;
  sexo: "m" | "f" | "x";
  nif?: number;
  telefone?: string;
  zona?: zona;
  createdAt: Date;
  updatedAt: Date;
}

interface zona {
  id: number;
  zona: string;
  cidade: string;
  ilha: string;
  pais: string;
}
