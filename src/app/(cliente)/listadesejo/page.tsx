import { Suspense } from "react";
import Loading from "@/componentes/Loading";
import ListaDesejoPage from "./ListaDesejoPage";

export const dynamic = "force-dynamic"; // evita prerender

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <ListaDesejoPage />
    </Suspense>
  );
}
