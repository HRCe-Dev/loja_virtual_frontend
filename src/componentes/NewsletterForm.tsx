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
    formState: { isSubmitting },
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
    <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-20 mt-10 px-6 py-10 md:py-20 rounded-3xl bg-gradient-to-r from-[#FF7700] to-[#265674]">
      {/* Texto */}
      <div className="text-white text-center md:text-left max-w-md">
        <h1 className="text-2xl md:text-3xl font-bold">
          Receba Ofertas Exclusivas
        </h1>
        <p className="text-base md:text-lg mt-3">
          Assine nossa newsletter e fique por <br className="hidden md:block" />
          dentro das promoções e novidades do <br className="hidden md:block" />
          HRCe
        </p>
      </div>

      {/* Formulário */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full max-w-sm"
      >
        <input
          type="text"
          id="nome"
          {...register("nome")}
          placeholder="Seu nome"
          className="bg-white rounded-xl py-2 px-4 w-full"
          required
        />
        <input
          type="email"
          id="email"
          {...register("email")}
          placeholder="Seu e-mail"
          className="bg-white rounded-xl py-2 px-4 w-full"
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-white text-orange-500 rounded-xl py-2 font-bold hover:bg-orange-500 hover:text-white transition-colors"
        >
          {isSubmitting ? "Enviando..." : "QUERO RECEBER OFERTAS!"}
        </button>
      </form>
    </div>
  );
}
