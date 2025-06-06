"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { UserCircle } from "lucide-react"
import { verifyAuth } from "@/api/auth";

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
