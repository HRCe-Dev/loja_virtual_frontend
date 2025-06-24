import { Cidade, Zona } from "@/types/Localizacao";
import { url } from "./url";
import { useEffect } from "react";

const ITEM = "cidades";

export async function ObterIlhas(): Promise<string[]> {
  const res = await fetch(url + "api0/localizacoes?ilhas=true");

  if (!(await res.ok)) {
    throw Error("Erro em obter ilhas");
  }

  const ilhas = (await res.json()) as string[];
  return ilhas;
}

export async function ObterCidades(): Promise<Cidade[]> {
  //verificar se dados estam no dispositivo
  const cidades = localStorage.getItem(ITEM);

  if (cidades) {
    return JSON.parse(cidades) as Cidade[];
  }

  const res = await fetch(url + "api0/localizacoes");
  const dados = await res.json();

  if (!(await res.ok)) {
    throw Error("Erro em obter as cidades");
  }

  const Cidades = dados as Cidade[];

  //guardar localmente
  localStorage.setItem(ITEM, JSON.stringify(Cidades));

  return Cidades;
}

export function useObterCidades(
  setCidades: React.Dispatch<React.SetStateAction<Cidade[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  dependencies: []
) {
  useEffect(() => {
    const obterCidades = async () => {
      try {
        setLoading(true);
        const Cidades = await ObterCidades();

        setCidades(Cidades);
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error(Error);
          alert(JSON.stringify(error));
        }
      }
      setLoading(false);
    };
    obterCidades();
  }, dependencies);
}

export function useObterIlhas(
  setIlhas: React.Dispatch<React.SetStateAction<string[]>>,
  dependencies: React.DependencyList = []
) {
  useEffect(() => {
    const obterIlhas = async () => {
      try {
        const Cidades = await ObterCidades();

        const ilhas = [...new Set(Cidades.map((cidade) => cidade.ilha))];

        setIlhas(ilhas);
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error(Error);
          alert(JSON.stringify(error));
        }

        const ilhas = [
          "Santo Antão",
          "São Vicente",
          "São Nicolau",
          "Sal",
          "Boavista",
          "Maio",
          "Santiago",
          "Fogo",
          "Brava",
        ];
        setIlhas(ilhas);
      }
    };
    obterIlhas();
  }, dependencies);
}

export async function obterZonas_ilha_cidade({
  cidade_id,
  ilha,
}: {
  cidade_id?: number;
  ilha?: string;
}): Promise<Zona[]> {
  if (!cidade_id && !ilha)
    throw Error("Esta funcao funciona com cidade_id ou nome da ilha");

  const res = await fetch(
    url +
      "api0/localizacoes/zonas?cidade_id=" +
      (cidade_id || "") +
      "&ilha=" +
      (ilha || "")
  );

  const dados = await res.json();

  if (!(await res.ok)) {
    console.error(dados.message);
    throw Error("Não foi possivel obter zonas");
  }

  return dados.zonas as Zona[];
}

export function UseObterZonas(
  cidade_id: number,
  setZonas: React.Dispatch<React.SetStateAction<Zona[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  dependencies: React.DependencyList = []
) {
  useEffect(() => {
    const obterZonas = async () => {
      setLoading(true);

      try {
        const zonas = await obterZonas_ilha_cidade({ cidade_id });

        setZonas(zonas);
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          alert(error);
        }
      }

      setLoading(false);
    };

    if (cidade_id) {
      obterZonas();
    }
  }, dependencies);
}

export async function GetLocalizacao(
  coordenadas: { lon: number; lat: number },
  setZona: React.Dispatch<React.SetStateAction<Zona>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) {
  setLoading(true);

  const res = await fetch(
    url + "api0/localizar?lat=" + coordenadas.lat + "&lon=" + coordenadas.lon
  );

  const dados = await res.json();

  if (!res.ok) {
    setError(dados.message);
    alert(dados.message);
  } else {
    setZona(dados.zona as Zona);
    //alert(JSON.stringify(dados));
  }

  //alert(JSON.stringify(dados));

  setLoading(false);
}
