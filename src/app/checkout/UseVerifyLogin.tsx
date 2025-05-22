"use client";
import { verifyAuth } from "@/api/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function useVerifyLogin(
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  dependencies: React.DependencyList = []
) {
  const router = useRouter();

  useEffect(() => {
    const verifyLogin = async () => {
      setLoading(true);
      const auth = await verifyAuth();

      if (!auth) {
        router.push("/login?next=entrega");
        return; // evita chamar setLoading(false) depois de redirecionar
      }

      setLoading(false);
    };

    verifyLogin();
  }, dependencies);
}

export default useVerifyLogin;
