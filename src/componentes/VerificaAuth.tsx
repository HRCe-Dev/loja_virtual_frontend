"use client";

import { useEffect, useRef, useState } from "react";
import { UserCircle } from "lucide-react";
import { verifyAuth } from "@/api/auth";
import MenuLateral from "./MenuLateral";

import { usePathname } from "next/navigation";

const AuthLinks = () => {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const [showMenu, setShowMenu] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const check = async () => {
      const result = await verifyAuth();
      setIsLoggedIn(result);
    };
    check();
  }, [pathname]);

  // Fecha o menu se clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <div className="relative">
      {isLoggedIn ? (
        <>
          <button ref={buttonRef} onClick={() => setShowMenu((prev) => !prev)}>
            <UserCircle size={28} className="text-white hover:text-gray-300" />
          </button>

          {showMenu && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-2 bg-white shadow-xl border rounded-lg z-50"
            >
              <div className="w-64 max-h-[90vh] overflow-y-auto">
                <MenuLateral isOpen={true} />
              </div>
            </div>
          )}
        </>
      ) : (
        <a href="/login" className="text-white text-sm hover:underline">
          Entrar/Cadastro
        </a>
      )}
    </div>
  );
};

export default AuthLinks;
