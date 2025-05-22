"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

const schema = z
  .object({
    firstName: z.string().min(1, "Obrigatório"),
    lastName: z.string().min(1, "Obrigatório"),
    phone: z.string().min(8, "Telefone inválido"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Mínimo 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não coincidem",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

export default function AccountForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    //const { confirmPassword, ...user } = data;
    console.log(JSON.stringify(data));
    router.push("/checkout/entrega");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-8 rounded-lg shadow-md max-w-xl mx-auto"
    >
      <h2 className="text-2xl font-semibold mb-6">Criar Conta</h2>

      <div className="flex gap-4">
        <div className="w-1/2">
          <label className="block text-sm mb-1">Primeiro Nome</label>
          <input
            {...register("firstName")}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
          <p className="text-red-500 text-sm mt-1">
            {errors.firstName?.message}
          </p>
        </div>

        <div className="w-1/2">
          <label className="block text-sm mb-1">Apelido</label>
          <input
            {...register("lastName")}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
          <p className="text-red-500 text-sm mt-1">
            {errors.lastName?.message}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm mb-1">Telefone</label>
        <input
          {...register("phone")}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        />
        <p className="text-red-500 text-sm mt-1">{errors.phone?.message}</p>
      </div>

      <div className="mt-4">
        <label className="block text-sm mb-1">Email</label>
        <input
          {...register("email")}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        />
        <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
      </div>

      <div className="mt-4">
        <label className="block text-sm mb-1">Palavra-passe</label>
        <input
          type="password"
          {...register("password")}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        />
        <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>
      </div>

      <div className="mt-4">
        <label className="block text-sm mb-1">Confirmar Palavra-passe</label>
        <input
          type="password"
          {...register("confirmPassword")}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        />
        <p className="text-red-500 text-sm mt-1">
          {errors.confirmPassword?.message}
        </p>
      </div>

      <button
        type="submit"
        className="bg-orange-400 hover:bg-orange-500 text-white font-medium w-full py-2 rounded-md mt-6 transition"
      >
        Continuar para Entrega →
      </button>
    </form>
  );
}
