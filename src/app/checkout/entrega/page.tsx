"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DeliveryForm from "@/app/checkout/Form/DeliveryForm";
import Wrapper from "@/app/checkout/Form/Wrapper";
import useVerifyLogin from "../UseVerifyLogin";

export default function DeliveryPage() {
  const [loading, setLoading] = useState<boolean>(false);

  useVerifyLogin(setLoading, []);

  return (
    <Wrapper step={2}>
      <DeliveryForm />
    </Wrapper>
  );
}
