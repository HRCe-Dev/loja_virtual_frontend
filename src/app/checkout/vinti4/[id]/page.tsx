"use client";
import { url } from "@/api/url";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function PagamentoPage() {
  const params = useParams();
  const pedido_id = params?.id as string;

  useEffect(() => {
    if (pedido_id) {
      fetch(`${url}pagamento/init`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pedido_id }),
      })
        .then((res) => res.text())
        .then((html) => {
          const doc = document.open("text/html", "replace");
          doc.write(html);
          doc.close();
        });
    }
  }, []);

  return <p>Redirecionando para o pagamento...</p>;
}
