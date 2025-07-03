// pages/pagar.tsx
import { fetchWithAuth } from "@/api/fetch_auth";
import { url } from "@/api/url";
import { useEffect } from "react";

export default function PagamentoPage() {
  useEffect(() => {
    fetchWithAuth(`${url}checkout/pagamento`, {
      method: "POST",
    })
      .then((res) => res.text())
      .then((html) => {
        const doc = document.open("text/html", "replace");
        doc.write(html);
        doc.close();
      });
  }, []);

  return <p>Redirecionando para o pagamento...</p>;
}
