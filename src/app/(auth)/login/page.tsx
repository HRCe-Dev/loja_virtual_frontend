"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import BannerCadastro from "../cadastro/BannerCadastro";
import { inputStyle } from "@/styles/forms";
import Link from "next/link";
import { CircleUser, Facebook } from "lucide-react";

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

  const onSubmit: SubmitHandler<loginForm> = (data) => {
    console.log("Dados enviados:", data);
    alert("Cadastro realizado com sucesso!");
  };

  return (
    <>
      <div className="flex flex-row">
        <BannerCadastro />

        <main className="flex flex-col mx-auto items-center p-6 w-1/2 mt-10 ">
          <div
            className="flex flex-col gap-1 my-4
           "
          >
            <h1 className="text-2xl font-bold">
              Página <span className="text-orange-500"> login</span>
            </h1>
            <p className="text-sm">Loga para ver suas compras</p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-full max-w-md "
          >
            <div className="flex flex-col space-y-1">
              <label className="text-sm text-gray-700 font-semibold">
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
              <label className="text-sm text-gray-700 font-semibold">
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
              className="mt-10 px-6 py-2 w-full rounded-full bg-orange-400 hover:bg-orange-500 text-white font-semibold mx-auto"
            >
              Login
            </button>
          </form>

          <div className="mt-5">
            <div className="flex items-center w-full">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="mx-4 text-sm text-gray-500">login via</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            {/* Botões sociais */}
            <div className="flex gap-4 items-center mx-auto justify-center my-4">
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

            <p className="text-sm text-gray-700">
              Não tens uma conta?{" "}
              <Link
                className="text-orange-500 hover:text-orange-900"
                href="/cadastro"
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
