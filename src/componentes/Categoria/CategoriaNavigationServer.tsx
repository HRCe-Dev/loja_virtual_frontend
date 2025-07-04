// app/components/CategoriaNavigationServer.tsx
import { obterCategorias } from "@/api/categorias.api";
import CategoriaNavigationClient from "./CategoriaNavigationClient";

const CategoriaNavigationServer = async () => {
  const categorias = await obterCategorias();

  return <CategoriaNavigationClient categorias={categorias} />;
};

export default CategoriaNavigationServer;
