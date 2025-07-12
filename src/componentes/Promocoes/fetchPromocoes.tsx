import fetchProdutos from "@/api/fetchProdutos";

const fetchPromocoes = async () => {
  return await fetchProdutos({ tipo: "promocoes" });
};

export default fetchPromocoes;
