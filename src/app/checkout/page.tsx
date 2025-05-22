"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AccountForm from "@/app/checkout/Form/AccountForm";
import Wrapper from "@/app/checkout/Form/Wrapper";
import { verifyAuth } from "@/api/auth";
import Loading from "@/componentes/Loading";

export default function CheckoutIndex() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const verifyLogin = async () => {
      setLoading(true);

      const auth = await verifyAuth();

      if (auth) {
        router.push("/checkout/entrega");
      }

      setLoading(false);
    };

    verifyLogin();
  }, []);

  return <Wrapper step={1}>{loading ? <Loading /> : <AccountForm />}</Wrapper>;
}
