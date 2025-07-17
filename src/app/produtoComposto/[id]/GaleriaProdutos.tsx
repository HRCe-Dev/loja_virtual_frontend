"use client";

import React, { useState } from "react";

interface ThumbnailProps {
  src: string;
  active: boolean;
  onClick: () => void;
}

const Thumbnail: React.FC<ThumbnailProps> = ({ src, active, onClick }) => {
  return (
    <div
      className={`cursor-pointer border p-1 rounded-md transition-all duration-200 ${
        active ? "border-orange-500" : "border-gray-200"
      }`}
      onClick={onClick}
    >
      <img
        src={src}
        alt="Miniatura do produto"
        className="w-full h-full object-contain"
      />
    </div>
  );
};

interface ProductGalleryProps {
  imagens: string[]; // array de URLs de imagens
  nome: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ imagens, nome }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const imagemPrincipal = imagens[activeIndex] || imagens[0];

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-2 w-full md:w-24 order-2 md:order-1 overflow-auto md:overflow-visible">
        {imagens.map((img, index) => (
          <Thumbnail
            key={index}
            src={img}
            active={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>

      {/* Imagem Principal */}
      <div className="w-full order-1 md:order-2 bg-gray-50 rounded-md flex items-center justify-center p-4 h-[300px] md:h-[400px]">
        <img
          src={imagemPrincipal}
          alt={nome}
          className="max-h-full max-w-full object-contain"
        />
      </div>
    </div>
  );
};

export default ProductGallery;
