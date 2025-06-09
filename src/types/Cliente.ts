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

// schemas/clienteSchema.ts
import { z } from "zod";

export const clienteSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  aplido: z.string().min(1, "Apelido é obrigatório"),
  dataNascimento: z.string().min(1, "Data de nascimento é obrigatória"),
  telefone: z
    .string()
    .min(7, "Número muito curto")
    .max(7, "Número inválido")
    .regex(/^[0-9]+$/, "Apenas números"),
  nif: z.number().int().nonnegative().optional(), // ou obrigatório se quiseres
});

export interface Usuario {
  nome: string;
  email: string;
}
