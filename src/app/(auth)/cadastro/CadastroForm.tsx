"use client";

import { url } from "@/api/url";
import SeletorEndereco from "@/componentes/Pop_ups/Seletor_Endereco/Seletor_Endereco";
import { inputStyle } from "@/styles/forms";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface cadastroForm {
  nome: string;
  aplido: string;
  data_nascimento: string;
  telefone: number;
  email: string;
  password: string;
  confirmar_password: string;
  termos: boolean;
  receber_email: boolean;
}

const CadastroForm: React.FC = () => {
  const [step, setStep] = useState(1);

  const [modalOpen, setModalOpen] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<cadastroForm>();

  const password = watch("password");

  const onSubmit: SubmitHandler<cadastroForm> = async (data) => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      //TODO: adicionar try...catch para mitigar erros

      console.log("Dados enviados:", data);
      const res = await fetch(url + "cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data }),
      });

      const dados = await res.json();

      if (res.ok) {
        alert("Cadastro realizado com sucesso!");
      } else {
        alert(dados?.message);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      {/* Header */}
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold">
          Cadastro <span className="text-orange-500">Cliente</span>
        </h1>
        <p className="text-sm text-gray-500">simples e rápido</p>
      </div>

      {/* Step bar */}
      <div className="w-full max-w-md flex justify-between mt-6 mb-4">
        <div
          className={`w-1/2 h-1 rounded ${
            step >= 1 ? "bg-orange-500" : "bg-gray-300"
          }`}
        ></div>
        <div
          className={`w-1/2 h-1 rounded ${
            step >= 2 ? "bg-orange-500" : "bg-gray-300"
          } ml-1`}
        ></div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full max-w-md"
      >
        {step === 1 && (
          <div className="space-y-4">
            <div className="flex flex-col space-y-1">
              <label className="text-sm text-gray-700 font-semibold">
                Primeiro Nome
              </label>
              <input
                type="text"
                placeholder="Digite seu primeiro nome"
                {...register("nome", { required: "Nome é obrigatório" })}
                className={inputStyle}
              />
              {errors.nome && (
                <p className="text-red-500 text-sm">{errors.nome.message}</p>
              )}
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-sm text-gray-700 font-semibold">
                Apelido
              </label>
              <input
                type="text"
                placeholder="Apelido"
                {...register("aplido", { required: "Apelido é obrigatório" })}
                className={inputStyle}
              />
              {errors.aplido && (
                <p className="text-red-500 text-sm">{errors.aplido.message}</p>
              )}
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-sm text-gray-700 font-semibold">
                Data de nascimento
              </label>
              <input
                type="date"
                {...register("data_nascimento", {
                  required: "Data de nascimento é obrigatória",
                })}
                className={inputStyle}
              />
              {errors.data_nascimento && (
                <p className="text-red-500 text-sm">
                  {errors.data_nascimento.message}
                </p>
              )}
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-sm text-gray-700 font-semibold">
                Telefone
              </label>
              <input
                type="number"
                placeholder="Telefone"
                {...register("telefone", {
                  required: "Telefone é obrigatório",
                })}
                className={inputStyle}
              />
              {errors.telefone && (
                <p className="text-red-500 text-sm">
                  {errors.telefone.message}
                </p>
              )}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
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

            <div className="flex flex-col space-y-1">
              <label className="text-sm text-gray-700 font-semibold">
                Confirmar palavra-passe
              </label>
              <input
                type="password"
                placeholder="Confirmar palavra-passe"
                {...register("confirmar_password", {
                  required: "Confirmação é obrigatória",
                  validate: (value) =>
                    value === password || "As palavras-passe não coincidem",
                })}
                className={inputStyle}
              />
              {errors.confirmar_password && (
                <p className="text-red-500 text-sm">
                  {errors.confirmar_password.message}
                </p>
              )}

              <div className="flex items-start gap-2 mt-5">
                <input
                  type="checkbox"
                  {...register("termos", { required: true })}
                  className="mt-1"
                />
                <p className="text-sm text-gray-600">
                  Concordas com os{" "}
                  <span className="font-semibold">Termos de Serviço</span>
                </p>
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  {...register("receber_email")}
                  className="mt-1"
                />
                <p className="text-sm text-gray-600">
                  Queres receber email das nossas principais promoções,
                  descontos e novidades
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Botões */}
        <div className="flex justify-between mt-4">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-800"
            >
              Voltar
            </button>
          )}

          <button
            type="submit"
            className="px-6 py-2 rounded-full bg-orange-400 hover:bg-orange-500 text-white font-semibold ml-auto"
          >
            {step === 1 ? "Próximo" : "Cadastrar"}
          </button>
        </div>
      </form>

      {modalOpen && (
        <SeletorEndereco
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default CadastroForm;
