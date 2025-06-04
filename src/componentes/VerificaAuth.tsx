"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { UserCircle } from "lucide-react";

export const verifyAuth = async (): Promise<boolean> => {
  console.log("Verificando se usuario está logado");
  try {
    return localStorage.getItem("token") !== null;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const AuthLinks = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const check = async () => {
      const result = await verifyAuth();
      setIsLoggedIn(result);
    };
    check();
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <Link href="/perfil">
          <UserCircle size={28} className="text-white hover:text-gray-300" />
        </Link>
      ) : (
        <Link href="/login" className="text-white text-sm hover:underline">
          Login
        </Link>
      )}
    </>
  );
};

export default AuthLinks;
