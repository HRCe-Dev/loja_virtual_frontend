"use client";

import { proximoRoute } from "@/util/proximoPage";
import { url } from "./url";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export type UserType = {
  id: string;
  email: string;
  nome: string;
};

export const fazerLogin = async (
  data: { email: string; password: string },
  router: AppRouterInstance,
  next?: string
) => {
  //TODO: adicionar try...catch para mitigar erros
  const res = await fetch(url + "login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...data }),
  });

  if (res.ok) {
    //alert("Login efectuado com sucesso");
    const data = await res.json();

    //guardar token
    if (data.token) {
      localStorage.setItem("token", data.token);

      //guardar dados de usuario
      localStorage.setItem("user", JSON.stringify(data.user));
      if (next) {
        router.push(proximoRoute[next]);
      } else {
        router.push("/");
      }
    }

    console.log(data);
  } else if (res.status === 401) {
    const errorData = await res.json();
    alert(errorData?.message);
  } else {
    alert("Erro desconhecido");
  }
};

export const verifyAuth = async (): Promise<boolean> => {
  console.log("Verificando se usuario esta logado");
  try {
    const out = localStorage.getItem("token") !== null;

    /* if (!out) {
      window.location.href = "/login?next=entrega";
    }*/

    return out;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};

export const obterDadosUser = (): UserType | null => {
  const dados = localStorage.getItem("user");

  if (!dados) {
    return null;
  }

  const user = JSON.parse(dados) as UserType;

  return user;
};
