import { fetchWithAuth } from "@/api/fetch_auth";
import { url } from "@/api/url";
import { Cliente } from "@/types/Cliente";
import { useEffect, useRef } from "react";

const url_ = url + "protected/cliente";

//obter meus dados
const obterDadosCliente = async () => {
  const res = await fetchWithAuth(url_);

  const dados = await res.json();

  if (!(await res.ok)) {
    throw Error(dados.message);
  }
  console.log(dados);
  return dados as Cliente;
};

//alterar dados
export const editarDadosClientes = async (
  data: Partial<Cliente>
): Promise<boolean> => {
  const res = await fetchWithAuth(url_, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const dados = await res.json();

  if (!(await res.ok)) {
    alert(dados.message);
    throw Error(dados.message);
  }

  return true;
};

//alterar password
export const alterarPassword = async (
  oldPassword: string,
  newPassword: string
): Promise<boolean> => {
  try {
    const res = await fetchWithAuth(url_ + "/pass", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ atual: oldPassword, nova: newPassword }),
    });

    const dados = await res.json();

    if (!(await res.ok)) {
      alert(dados.message);
      return false;
    }
    return true;
  } catch (error) {
    alert("Erro ao conectar com servidor");
    console.error(error);
    return false;
  }
};

export const useObterDadosClientes = (
  setCliente: React.Dispatch<React.SetStateAction<Cliente | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setErro: React.Dispatch<React.SetStateAction<string | null>>,
  dependencies: []
) => {
  const hasRun = useRef(false);
  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const getter = async () => {
      try {
        setLoading(true);

        const dados = await obterDadosCliente();

        setCliente(dados);
      } catch (error) {
        console.error(error);
        setErro("Erro em conectar com servidor");
      } finally {
        setLoading(false);
      }
    };

    getter();
  }, dependencies);
};
