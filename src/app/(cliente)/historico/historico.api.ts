import { fetchWithAuth } from "@/api/fetch_auth";
import { url } from "@/api/url";

const url_ = url + "protected/checkout/meuspedidos";

//obter meus pedidos
const obterMeusPedidos = async () => {
  const res = await fetchWithAuth(url_);

  const dados = await res.json();

  if (!(await res.ok)) {
    alert(dados.message);
    throw Error(dados.message);
  }

  return dados;
};
