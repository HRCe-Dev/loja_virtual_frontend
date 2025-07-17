import { url } from "@/api/url";
import { ObterProdutsQuery, Produto } from "@/types/Produto";

const fetchProdutos = async (query?: ObterProdutsQuery): Promise<Produto[]> => {
  try {
    const params = query
      ? new URLSearchParams(
          Object.entries(query).reduce((acc, [key, value]) => {
            if (value !== undefined && value !== null) {
              acc[key] = String(value);
            }
            return acc;
          }, {} as Record<string, string>)
        ).toString()
      : "";

    const res = await fetch(`${url}produtos?${params}`);
    const data = await res.json();

    if (!res.ok) {
      console.log(data?.message);
      throw new Error(data?.message);
    }

    //console.log(data);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("An unknown error occurred");
    }

    return [];
  }
};

export default fetchProdutos;
