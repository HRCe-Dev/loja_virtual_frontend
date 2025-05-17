"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    imageUrl:
      "https://res.cloudinary.com/dnptdd7su/image/upload/v1747475118/hrce/home_banners/banner01.jpg",
    alt: "Banner 1",
  },
  {
    id: 2,
    imageUrl:
      "https://res.cloudinary.com/dnptdd7su/image/upload/v1747475119/hrce/home_banners/banner02.jpg",
    alt: "Banner 2",
  },
  // Adicione mais aqui
];

export default function BannerCarousel() {
  const [current, setCurrent] = useState(0);
  const total = slides.length;

  const goToPrev = () => {
    setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full mx-auto overflow-hidden">
      {/* Slide */}
      <div className="relative w-full h-64 md:h-100 rounded-xl bg-gray-100">
        <Image
          src={slides[current].imageUrl}
          alt={slides[current].alt}
          fill
          className="object-cover rounded-xl transition-all duration-500"
          sizes="100vw"
          priority
        />
      </div>

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
