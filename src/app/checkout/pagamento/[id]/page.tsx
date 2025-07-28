"use client";
import { useEffect, useState } from "react";
import PaymentForm from "@/app/checkout/Form/PaymentForm";
import Wrapper from "@/app/checkout/Form/Wrapper";
import useVerifyLogin from "../../UseVerifyLogin";
import Loading from "@/componentes/Loading";
import ErroMiniModal from "@/componentes/ErroMiniModal";

export default function PaymentPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const erroParam = query.get("erro");
    setErro(erroParam);
  }, []);

  useVerifyLogin(setLoading, []);

  return (
    <Wrapper step={3} wide>
      {loading ? <Loading /> : <PaymentForm />}
      <ErroMiniModal error={erro} />
    </Wrapper>
  );
}
