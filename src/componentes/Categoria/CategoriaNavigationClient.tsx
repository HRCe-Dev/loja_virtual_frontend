"use client";

import { ChevronLeft, ChevronRight, BoxIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  link: string;
  categorias: { id: number; nome: string; imagem_url?: string | null }[];
};

export default function CategoriaNavigationClient({ categorias, link }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState(false);

  // Detecta se há overflow
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleResize = () => {
      setCanScroll(el.scrollWidth > el.clientWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    scrollRef.current.scrollTo({
      left:
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full px-4 py-2 relative mx-auto">
      <div className="flex items-center space-x-2">
        {canScroll && (
          <button
            onClick={() => scroll("left")}
            className="p-1 rounded-full bg-white shadow"
          >
            <ChevronLeft size={28} />
          </button>
        )}

        <div
          ref={scrollRef}
          className={`flex gap-3 md:gap-6 overflow-x-auto no-scrollbar transition-all duration-300 ${
            canScroll ? "justify-start" : "justify-center"
          } w-full`}
        >
          {categorias.map((cat) => (
            <Link
              href={`/${link}/${cat.id}`}
              key={cat.id}
              className="flex flex-col items-center justify-center px-4 py-6 md:px-6 md:py-8 min-w-[130px] min-h-[130px] border border-gray-300 hover:border-[] rounded bg-white text-black hover:bg-[#FF7700] hover:text-white hover:shadow-xl transition-all duration-300"
            >
              <div className="w-[48px] h-[48px] flex items-center justify-center mb-2 relative">
                {cat.imagem_url ? (
                  <Image
                    src={cat.imagem_url}
                    alt={cat.nome}
                    width={48}
                    height={48}
                    className="object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const fallback = e.currentTarget
                        .nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />
                ) : null}
                <BoxIcon
                  size={32}
                  className="absolute text-gray-400"
                  style={{
                    display: !cat.imagem_url ? "flex" : "none",
                  }}
                />
              </div>
              <span className="mt-1 text-md text-center">{cat.nome}</span>
            </Link>
          ))}
        </div>

        {canScroll && (
          <button
            onClick={() => scroll("right")}
            className="p-1 rounded-full bg-white shadow"
          >
            <ChevronRight size={28} />
          </button>
        )}
      </div>
    </div>
  );
}
