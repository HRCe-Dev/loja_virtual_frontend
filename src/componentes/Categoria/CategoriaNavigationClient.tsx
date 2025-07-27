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
              className="flex flex-col group items-center justify-between  px-2 py-3 hover:bg-[#FFF] text-gray-600  "
            >
              <div className="my-auto">
                {cat.imagem_url ? (
                  <Image
                    src={cat.imagem_url}
                    alt={cat.nome}
                    width={150}
                    height={150}
                    className="object-contain  transition-transform duration-500 ease-in-out group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const fallback = e.currentTarget
                        .nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />
                ) : null}
                <BoxIcon
                  className="transition-transform duration-500 ease-in-out group-hover:scale-110 text-gray-400 w-20 h-20 sm:w-25 sm:h-25"
                  style={{
                    display: !cat.imagem_url ? "flex" : "none",
                  }}
                />
              </div>
              <span className="mt-2 line-clamp-2 min-h-[3.5rem] text-md text-center font-bold transition-transform duration-500 ease-in-out group-hover:scale-110">
                {cat.nome}
              </span>
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
