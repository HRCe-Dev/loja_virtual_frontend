import fetchProdutosMaisVendidos from "@/app/(home)/fetchProdutosMaisVendidos";

const fetchPromocoes = async () => {
  return await fetchProdutosMaisVendidos();
};

export default fetchPromocoes;
