import { Menu } from "lucide-react";
import React from "react";

const MenuCategorias: React.FC = () => {
  const categorias = [
    "Tudo",
    "Vestuarios",
    "Eletrônicos",
    "Beleza",
    "Calçado",
    "Mais",
  ];

  return (
    <div className="flex flex-row gap-20 justify-center mt-2">
      <button>
        <Menu className="text-orange-500" />
      </button>

      <div className="flex flex-row  gap-20">
        {categorias.map((cat, index) => (
          <div
            key={index}
            className={`flex w-25 justify-center align-center text-center py-1.5 text-sm px-3  rounded-3xl hover:bg-orange-700  ${
              index === 0
                ? "text-white bg-orange-500 font-bold "
                : " bg-[#1b7ec91a] text-black hover:font-bold  hover:text-white"
            }`}
          >
            {cat}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuCategorias;
