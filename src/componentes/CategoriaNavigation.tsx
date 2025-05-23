"use client";

import { useState, useRef } from "react";
import {
  Smartphone,
  Monitor,
  Watch,
  Camera,
  Headphones,
  Gamepad2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const categorias = [
  { label: "Phones", icon: Smartphone },
  { label: "Computers", icon: Monitor },
  { label: "SmartWatch", icon: Watch },
  { label: "Camera", icon: Camera },
  { label: "HeadPhones", icon: Headphones },
  { label: "Gaming", icon: Gamepad2 },
];

const CategoriaNavigation = () => {
  const [active, setActive] = useState("Camera");
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full px-4 py-2 relative mx-auto">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold">Navegar por categoria</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => scroll("left")}
            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto no-scrollbar gap-3 md:gap-6"
      >
        {categorias.map(({ label, icon: Icon }) => {
          const isActive = label === active;
          return (
            <button
              key={label}
              onClick={() => setActive(label)}
              className={`flex flex-col items-center justify-center px-4 py-6 md:px-6 md:py-8 min-w-[140px] min-h-[140px] border border-gray-300 rounded transition-colors duration-200 ${
                isActive ? "bg-[#FF7700] text-white" : "bg-white text-black"
              }`}
            >
              <Icon size={28} className={`${isActive ? "text-white" : "text-black"}`} />
              <span className="mt-1 text-md">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoriaNavigation;
