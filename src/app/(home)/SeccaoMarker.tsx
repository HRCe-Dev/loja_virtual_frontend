import React from "react";
//import Link from "next/link";

interface SeccaoMarkerProps {
  children: React.ReactNode;
  href?: string; // se existir, mostra o botão "View All"
}

//TODO: implementar pagina de vertodo para cada seccao

const SeccaoMarker: React.FC<SeccaoMarkerProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-between w-full">
      {/* Marcador e Título */}
      <div className="flex items-center gap-3 md:text-2xl text-xl font-bold text-black">
        <div className="w-2 h-8 md:w-4 md:h-10 bg-[#FF7700] rounded-md" />
        <span>{children}</span>
      </div>

      {/* Botão "View All" se href estiver definido */}
      {/*href && (
        <Link
          href={href}
          className="hidden md:inline-block bg-[#FF7700] text-white text-sm font-medium px-4 py-1 rounded hover:bg-orange-600 transition-colors"
        >
          Ver Tudo
        </Link>
      )*/}
    </div>
  );
};

export default SeccaoMarker;
