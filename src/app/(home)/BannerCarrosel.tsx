"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  id: number;
  desktop: string;
  tablet: string;
  mobile: string;
}

const slides: Slide[] = [
  {
    id: 1,
    desktop: "/1920_600-entrega24.svg",
    tablet: "/1024_600-entrega24 (2).svg",
    mobile: "/768_300-entrega24.svg",
  },
  {
    id: 2,
    desktop: "/1920_600-devoiluções.svg",
    tablet: "/1024_600-devoluções.svg",
    mobile: "/768_300-devoiluções.svg",
  },
];

export default function BannerCarousel() {
  const [current, setCurrent] = useState(0);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const updateSize = () => setScreenWidth(window.innerWidth);
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const getImage = (slide: Slide): string => {
    if (screenWidth < 668) return slide.mobile;
    if (screenWidth < 1024) return slide.tablet;
    return slide.desktop;
  };

  const goToPrev = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const goToNext = () =>
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  return (
    <div className="relative min-w-full overflow-hidden">
      {/* Slide */}
      <div
        className="h-[500px] bg-cover bg-center transition-all duration-500"
        style={{
          backgroundImage: `url(${getImage(slides[current])})`,
        }}
      />

      {/* Setas */}
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

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {slides.map((_, index) => (
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
