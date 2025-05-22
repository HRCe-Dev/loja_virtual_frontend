"use client";
import { useState } from "react";
import DeliveryForm from "@/app/checkout/Form/DeliveryForm";
import Wrapper from "@/app/checkout/Form/Wrapper";
import useVerifyLogin from "../UseVerifyLogin";
import Loading from "@/componentes/Loading";

export default function DeliveryPage() {
  const [loading, setLoading] = useState<boolean>(false);

  useVerifyLogin(setLoading, []);

  return <Wrapper step={2}>{loading ? <Loading /> : <DeliveryForm />}</Wrapper>;
}
