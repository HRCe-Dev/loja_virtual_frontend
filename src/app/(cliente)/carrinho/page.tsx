import { Suspense } from "react";
import CarrinhoPage from "./CarrinhoPage";
import Loading from "@/componentes/Loading";

export const dynamic = "force-dynamic"; // evita prerender

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <CarrinhoPage />
    </Suspense>
  );
}
