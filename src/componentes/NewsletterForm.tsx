"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Definindo o schema de validação com Zod
const newsletterSchema = z.object({
  email: z
    .string()
    .email("Por favor, insira um e-mail válido")
    .nonempty("E-mail é obrigatório"),
  nome: z.string().nonempty("Nome é obrigatório"),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

export function NewsletterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormData) => {
    // Simulando uma requisição assíncrona
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Dados enviados:", data);
    // Aqui você pode adicionar a lógica de envio para sua API
    reset();
  };

  return (
    <div className="flex flex-row  gap-20 justify-center mt-15 p-15 mx-30 rounded-xl bg-gradient-to-r from-[#FB943E] from-27% to-[#6773D3] to-69%">
      <div className="text-white">
        <h1 className="text-3xl font-bold">Receba Ofertas Exclusivas</h1>
        <p className="text-lg mt-3">
          Assine nossa newsletter e fique por <br /> dentro das promoções e
          novidades do <br />
          HRCe
        </p>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <input
              type="text"
              id="nome"
              {...register("nome", { required: true })}
              placeholder="Seu nome"
              className="bg-white rounded-xl py-2 px-6"
              required
            />
          </div>
          <div>
            <input
              type="email"
              id="email"
              placeholder="Seu e-mail"
              className="bg-white rounded-xl py-2 px-6"
              required
              {...register("email", { required: true })}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-white text-orange-500 rounded-xl py-2 font-bold hover:bg-orange-500 hover:text-white"
          >
            {isSubmitting ? "Enviando..." : "QUERO RECEBER OFERTAS!"}
          </button>
        </form>
      </div>
    </div>
  );
}
