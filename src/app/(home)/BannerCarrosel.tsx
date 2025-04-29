"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  { id: 1, content: "ZONA DE BANNER 1" },
  { id: 2, content: "ZONA DE BANNER 2" },
  { id: 3, content: "ZONA DE BANNER 3" },
  { id: 4, content: "ZONA DE BANNER 4" },
  { id: 5, content: "ZONA DE BANNER 5" },
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
    <div className="relative w-full mx-auto">
      {/* Slide */}
      <div className="rounded-xl h-100 flex items-center justify-center bg-gray-700 text-gray-300 text-3xl font-bold transition-all duration-500">
        {slides[current].content}
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
