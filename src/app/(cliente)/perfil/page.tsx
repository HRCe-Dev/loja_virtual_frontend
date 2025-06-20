import { Suspense } from "react";
import Loading from "@/componentes/Loading";
import PerfilPage from "./PerfilPage";

export const dynamic = "force-dynamic"; // evita prerender

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <PerfilPage />
    </Suspense>
  );
}
