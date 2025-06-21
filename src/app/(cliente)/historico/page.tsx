import { Suspense } from "react";
import Loading from "@/componentes/Loading";
import HistoricoPage from "./HistoricoPage";

export const dynamic = "force-dynamic"; // evita prerender

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <HistoricoPage />
    </Suspense>
  );
}
