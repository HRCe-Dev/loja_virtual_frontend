import { Suspense } from "react";
import EnderecosEntrega from "./EnderecosEntrega";
import Loading from "@/componentes/Loading";

export const dynamic = "force-dynamic"; // evita prerender

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <EnderecosEntrega />
    </Suspense>
  );
}
