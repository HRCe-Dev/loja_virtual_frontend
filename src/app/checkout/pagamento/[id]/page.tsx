"use client";
import { useState } from "react";
import PaymentForm from "@/app/checkout/Form/PaymentForm";
import Wrapper from "@/app/checkout/Form/Wrapper";
import useVerifyLogin from "../../UseVerifyLogin";
import Loading from "@/componentes/Loading";

export default function PaymentPage() {
  const [loading, setLoading] = useState<boolean>(false);

  useVerifyLogin(setLoading, []);

  return (
    <Wrapper step={3} wide>
      {loading ? <Loading /> : <PaymentForm />}
    </Wrapper>
  );
}
