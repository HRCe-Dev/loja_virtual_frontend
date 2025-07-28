"use client";

import { trackingProdutos } from "@/api/analytics.api";
import React, { useEffect, useRef, useState } from "react";

interface ThumbnailProps {
  src: string;
  active: boolean;
  onClick: () => void;
}

const Thumbnail: React.FC<ThumbnailProps> = ({ src, active, onClick }) => {
  return (
    <div
      className={`cursor-pointer border p-2 mb-3 rounded-md ${
        active ? "border-blue-400" : "border-gray-200"
      }`}
      onClick={onClick}
    >
      <img src={src} alt="Product thumbnail" className="w-full h-auto" />
    </div>
  );
};

interface productGaleryProps {
  produto_id: string;
  imagem_url: string;
  nome: string;
}

const ProductGallery: React.FC<productGaleryProps> = ({
  produto_id,
  imagem_url,
  nome,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomStyle, setZoomStyle] = useState({
    display: "none",
    backgroundPosition: "0% 0%",
  });
  const imgContainerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgContainerRef.current || !imgRef.current) return;

    const container = imgContainerRef.current;
    const img = imgRef.current;
    const imgRect = img.getBoundingClientRect();

    // Posição relativa do cursor na imagem (0 a 1)
    const x = (e.clientX - imgRect.left) / imgRect.width;
    const y = (e.clientY - imgRect.top) / imgRect.height;

    // Garante que as coordenadas ficam dentro da imagem
    const boundedX = Math.max(0, Math.min(1, x));
    const boundedY = Math.max(0, Math.min(1, y));

    setZoomStyle({
      display: "block",
      backgroundPosition: `${boundedX * 100}% ${boundedY * 100}%`,
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ ...zoomStyle, display: "none" });
  };

  useEffect(() => {
    if (produto_id) {
      trackingProdutos(produto_id);
    }
  }, []);

  return (
    <div className="flex flex-col md:flex-row">
      {/* Thumbnails (mantido igual) */}
      <div className="w-full md:w-1/6 mr-4 order-2 md:order-1 flex md:flex-col mt-4 md:mt-0">
        {[0, 1, 2, 3].map((index) => (
          <div className="w-1/4 md:w-full px-1 md:px-0 md:mb-3" key={index}>
            <Thumbnail
              src={imagem_url}
              active={activeIndex === index}
              onClick={() => setActiveIndex(index)}
            />
          </div>
        ))}
      </div>

      {/* Container principal com overflow visível */}
      <div className="w-full md:w-5/6 order-1 md:order-2 relative overflow-visible">
        {/* Container da imagem com zoom */}
        <div
          ref={imgContainerRef}
          className="bg-gray-50 rounded-md flex items-center justify-center p-4 relative "
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <img
            ref={imgRef}
            src={imagem_url}
            alt={nome}
            className="max-w-full max-h-96 object-contain cursor-zoom-in"
          />

          {/* Lupa com posicionamento absoluto */}
          <div
            className="hidden md:block absolute  w-64 h-64 border-2 border-gray-300 bg-white rounded-full pointer-events-none overflow-hidden shadow-lg z-50"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              backgroundImage: `url(${imagem_url})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: `${
                imgRef.current?.width ? imgRef.current.width * 2 : 800
              }px`,
              ...zoomStyle,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
