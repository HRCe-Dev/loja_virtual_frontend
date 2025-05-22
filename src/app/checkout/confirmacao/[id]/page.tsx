"use client";
import { useState } from "react";
import Confirmation from "@/app/checkout/Form/ConfirmationForm";
import Wrapper from "@/app/checkout/Form/Wrapper";
import useVerifyLogin from "../../UseVerifyLogin";
import Loading from "@/componentes/Loading";

export default function ConfirmationPage() {
  const [loading, setLoading] = useState<boolean>(false);

  useVerifyLogin(setLoading, []);

  return <Wrapper step={4}>{loading ? <Loading /> : <Confirmation />}</Wrapper>;
}
