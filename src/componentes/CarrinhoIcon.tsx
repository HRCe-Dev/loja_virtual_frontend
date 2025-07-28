"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { obterQtdProdutosCarrinho } from "@/app/(cliente)/carrinho/carrinho";

interface props {
  className: string;
  size?: number;
}

export default function CarrinhoIcon({ className, size }: props) {
  const [qtd_carrinho, setQtdCarrinho] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const qtd = await obterQtdProdutosCarrinho();
      setQtdCarrinho(qtd);
    };

    fetchData();
  }, []);

  return (
    <div className="group relative">
      <Link href="/carrinho">
        <ShoppingCart size={size} className={className} />
      </Link>

      {qtd_carrinho > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500/50 font-bold group-hover:bg-red-500/80  text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {qtd_carrinho}
        </span>
      )}
    </div>
  );
}
