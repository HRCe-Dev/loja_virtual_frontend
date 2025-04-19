import { url } from "@/api/url";

const fetchProdutosMaisVendidos = async () => {
  try {
    const res = await fetch(url + "produtos/all");
    const data = await res.json();

    if (!res.ok) {
      console.log(data?.message);
      throw new Error(data?.message);
    }

    console.log(data);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("An unknown error occurred");
    }

    return null;
  }
};

export default fetchProdutosMaisVendidos;
