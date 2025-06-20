"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import BannerCadastro from "../cadastro/BannerCadastro";
import { inputStyle } from "@/styles/forms";
import Link from "next/link";
import { CircleUser, Facebook } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fazerLogin } from "@/api/auth";

interface loginForm {
  email: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginForm>();

  const [next, setNext] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setNext(params.get("next"));
  }, []);

  const router = useRouter();

  const onSubmit: SubmitHandler<loginForm> = async (data) => {
    console.log("Dados enviados:", data);
    await fazerLogin(data, router, next!);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen w-full">
        <div className="w-full md:w-1/2">
          <BannerCadastro />
        </div>

        <main className="w-full md:w-1/2 flex flex-col  gap-20 px-8 py-6 md:py-46 md:px-16 lg:px-24 min-h-screen">
          <div className="text-center md:text-left my-2">
            <h1 className="text-3xl md:text-4xl font-bold">
              Página <span className="text-orange-500"> login</span>
            </h1>
            <p className="text-base md:text-lg text-gray-600 md:mt-4">
              Loga para ver suas compras
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto"
          >
            <div className="flex flex-col space-y-1">
              <label className="text-base md:text-lg text-gray-700 font-semibold">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email é obrigatório",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Email inválido",
                  },
                })}
                className={inputStyle}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-base md:text-lg text-gray-700 font-semibold">
                Palavra-passe
              </label>
              <input
                type="password"
                placeholder="Palavra-passe"
                {...register("password", {
                  required: "Palavra-passe é obrigatória",
                  minLength: {
                    value: 6,
                    message: "Mínimo de 6 caracteres",
                  },
                })}
                className={inputStyle}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="mt-6 px-6 py-2 md:mt-10 md:px-8 md:py-4 w-full rounded-full bg-orange-400 hover:bg-orange-500 text-white font-semibold"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center space-y-4">
            <div className="flex items-center justify-center text-gray-500 gap-2">
              <div className="h-px bg-gray-300 flex-grow" />
              <span className="text-base md:text-lg whitespace-nowrap">
                Login via
              </span>
              <div className="h-px bg-gray-300 flex-grow" />
            </div>

            {/* Botões sociais */}
            <div className="flex gap-4 justify-center mt-4">
              <button
                title="Clique para fazer login com sua conta do Google"
                className="border border-gray-300 rounded-full p-3 hover:shadow-md transition"
              >
                <CircleUser size={20} />
              </button>
              <button
                title="Clique para fazer login usando sua conta do Facebook"
                className="border border-gray-300 rounded-full p-3 hover:shadow-md transition"
              >
                <Facebook size={20} />
              </button>
            </div>

            <p className="text-base md:text-lg text-gray-700">
              Não tens uma conta?{" "}
              <Link
                className="text-orange-500 hover:text-orange-900"
                href={{
                  pathname: "/cadastro",
                  query: next ? { next } : undefined,
                }}
              >
                Cadastrar
              </Link>
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
