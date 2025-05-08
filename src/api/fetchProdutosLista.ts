import { Carrinho, Produto } from "@/types/Produto";
import { url } from "./url";

const fetchProdutosLista = async (
  lista: Carrinho[]
): Promise<Produto[] | null> => {
  try {
    const res = await fetch(url + "produtos/detalhes/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ produtos_lista: lista }),
    });

    console.log(JSON.stringify({ produtos_lista: lista }));

    const data = await res.json();

    if (!res.ok) {
      console.log(data?.message);
      throw new Error(data?.message);
    }

    console.log(data);
    return data as Produto[];
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("An unknown error occurred");
    }

    return null;
  }
};

export default fetchProdutosLista;
