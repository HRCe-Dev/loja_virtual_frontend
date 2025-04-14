"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface cadastroForm {
  nome: string;
  aplido: string;
  data_nascimento: string;
  telefone: number;
  email: string;
  password: string;
  confirmar_password: string;
}

const CadastroForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<cadastroForm>();

  // Função de submit
  const onSubmit: SubmitHandler<cadastroForm> = (data) => {
    alert(data);
    console.log(data);
  };

  const input_style = "bg-gray-200 rounded-md px-2 py-1 text-gray-500";

  return (
    <div className="flex flex-col items-center justify-center mt-2 p-10">
      <div className="text-left justify-start">
        <h1 className="text-2xl font-bold">
          Cadastro <span className="text-orange-500">Cliente</span>
        </h1>
        <p className="text-sm text-gray-500">simples e rápido</p>
      </div>

      <form
        className="flex flex-col items-center justify-center gap-7 mt-5
      "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div id="step1" className="hidden">
          <div>
            <p>Primeiro Nome</p>
            <input
              type="text"
              id="nome"
              className={input_style}
              placeholder="digite seu primeiro nome"
              {...register("nome", { required: "Nome é obrigatório" })}
            />
            {errors.nome && <p>{errors.nome.message}</p>}
          </div>

          <div>
            <p>Apelido</p>
            <input
              type="text"
              id="aplido"
              placeholder="digite seu aplido"
              className={input_style}
              {...register("aplido", { required: "Aplido é obrigatório" })}
            />
            {errors.aplido && <p>{errors.aplido.message}</p>}
          </div>

          <div>
            <p>Data de Nascimento</p>
            <input
              type="date"
              id="data_nascimento"
              className={input_style}
              {...register("data_nascimento", {
                required: "Data Nascimento é obrigatório",
              })}
            />
            {errors.data_nascimento && <p>{errors.data_nascimento.message}</p>}
          </div>

          <div>
            <p>Telemóvel</p>
            <div>
              <select
                name="indicativo"
                id="indicativo"
                className={input_style}
              ></select>
              <input
                type="number"
                id="telemovel"
                className={input_style}
                {...register("telefone", {
                  required: "Telefone é obrigatório",
                })}
              />
              {errors.telefone && <p>{errors.telefone.message}</p>}
            </div>
          </div>
        </div>

        <div id="step2">
          <div>
            <p>Email</p>
            <input
              type="email"
              id="email"
              className={input_style}
              placeholder="Digite seu email"
              {...register("email", { required: "email é obrigatório" })}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>

          <div>
            <p>Password</p>
            <input
              type="password"
              id="password"
              className={input_style}
              placeholder="digite sua password"
              {...register("password", { required: "Password é obrigatório" })}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>

          <div>
            <p>Confirmar Password</p>
            <input
              type="password"
              id="confirmar_password"
              className={input_style}
              placeholder="Confirme sua password"
              {...register("confirmar_password", {
                required: "Confirmar Password é obrigatório",
              })}
            />
            {errors.confirmar_password && (
              <p>{errors.confirmar_password.message}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="my-5 px-5 py-2 bg-orange-400 hover:bg-orange-700 text-gray-500 rounded-md"
        >
          próximo
        </button>
      </form>
    </div>
  );
};

export default CadastroForm;
