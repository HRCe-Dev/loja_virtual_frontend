"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/context/CheckoutContext";
import PaymentForm from "@/app/checkout/Form/PaymentForm";
import Wrapper from "@/app/checkout/Form/Wrapper";
import useVerifyLogin from "../UseVerifyLogin";

export default function PaymentPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useVerifyLogin(setLoading, []);

  return (
    <Wrapper step={3} wide>
      <PaymentForm />
    </Wrapper>
  );
}
