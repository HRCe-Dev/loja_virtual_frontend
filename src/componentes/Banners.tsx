"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Banners } from "@/types/Produto";

interface props {
  banners: Banners[];
}

export default function BannerCarousel({ banners }: props) {
  const [current, setCurrent] = useState(0);
  const [screenWidth, setScreenWidth] = useState(0);

  const AUTO_PLAY_INTERVAL = 2000; // ⏱ Tempo em milissegundos (2 segundos)

  useEffect(() => {
    const updateSize = () => setScreenWidth(window.innerWidth);
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, AUTO_PLAY_INTERVAL);

    return () => clearInterval(interval);
  }, [banners.length]);

  const getImage = (slide: Banners): string => {
    if (screenWidth < 658 && slide.url_mobile) return slide.url_mobile;
    if (screenWidth < 1024 && slide.url_tablet) return slide.url_tablet;
    return slide.url;
  };

  const goToPrev = () =>
    setCurrent((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  const goToNext = () =>
    setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));

  return (
    <div className="relative min-w-full overflow-hidden">
      {/* Slide */}
      <div
        className="h-[400px] sm:h-[400px] 3xl:h-[600px] bg-cover bg-center transition-all duration-500 cursor-pointer"
        style={{
          backgroundImage: `url(${getImage(banners[current])})`,
        }}
      />

      {/* Setas */}
      {banners.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/70 rounded-full hover:bg-white"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/70 rounded-full hover:bg-white"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full ${
              current === index ? "bg-gray-800" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
