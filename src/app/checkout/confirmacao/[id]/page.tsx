"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/context/CheckoutContext";
import Confirmation from "@/app/checkout/Form/ConfirmationForm";
import Wrapper from "@/app/checkout/Form/Wrapper";
import useVerifyLogin from "../../UseVerifyLogin";

export default function ConfirmationPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useVerifyLogin(setLoading, []);

  return (
    <Wrapper step={4}>
      <Confirmation />
    </Wrapper>
  );
}
