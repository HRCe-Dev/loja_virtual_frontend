import { Suspense } from "react";
import PaginaBusca from "./PaginaBusca";
import Loading from "@/componentes/Loading";

export default function Page() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <PaginaBusca />
      </Suspense>
    </>
  );
}
