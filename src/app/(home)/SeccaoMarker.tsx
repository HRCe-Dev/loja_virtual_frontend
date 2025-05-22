import React from "react";

interface SeccaoMarkerProps {
  children: React.ReactNode;
}

const SeccaoMarker: React.FC<SeccaoMarkerProps> = ({ children }) => {
  return (
    <div className="flex flex-row items-center gap-3 md:text-2xl text-xl font-bold text-black justify-center md:justify-start">
      {/* Barra laranja mais alta, visível como antes */}
      <div className="w-2 h-8 md:w-4 md:h-10 bg-orange-500 rounded-md"></div>

      {/* Texto da seção */}
      <span className="text-center md:text-left ">{children}</span>
    </div>
  );
};

export default SeccaoMarker;
