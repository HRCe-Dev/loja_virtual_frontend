import { url } from "@/api/url";
import { Avaliacoes } from "@/types/AvaliacoesTypes";
import { useEffect } from "react";

//obter avalicoes hook
export const useGetAvaliacoes = (
  produto_id: string,
  setAvaliacoes: React.Dispatch<React.SetStateAction<Avaliacoes | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  dependecies: React.DependencyList = []
) => {
  useEffect(() => {
    const getAvaliacoes = async () => {
      try {
        setLoading(true);

        const res = await fetch(url + "produtos/avaliacoes/" + produto_id);

        const data = (await res.json()) as Avaliacoes;

        if (res.ok) {
          alert(JSON.stringify(data));
          setAvaliacoes(data);
        } else {
          throw Error("Erro em obter avaliações");
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
        setError("Erro em obter avaliações");
      }
    };

    getAvaliacoes();
  }, dependecies);
};

//carregar mais avaliacoes

//criar avaliacao

//responder avalicao

//curtir avaliacao
