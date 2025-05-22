"use client";

import { trackingProdutos } from "@/api/analytics.api";
import React, { useEffect, useState } from "react";

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
  // Placeholder image URL from Pexels - blue geometric shape similar to the design
  //const placeholderImage =
  // "https://images.pexels.com/photos/5011647/pexels-photo-5011647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

  const placeholderImage = imagem_url;

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (produto_id) {
      trackingProdutos(produto_id);
    }
  }, []);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/6 mr-4 order-2 md:order-1 flex md:flex-col mt-4 md:mt-0">
        {[0, 1, 2, 3].map((index) => (
          <div className="w-1/4 md:w-full px-1 md:px-0 md:mb-3" key={index}>
            <Thumbnail
              src={placeholderImage}
              active={activeIndex === index}
              onClick={() => setActiveIndex(index)}
            />
          </div>
        ))}
      </div>
      <div className="w-full md:w-5/6 order-1 md:order-2 bg-gray-50 rounded-md flex items-center justify-center p-4">
        <img
          src={placeholderImage}
          alt={nome}
          className="max-w-full max-h-96 object-contain"
        />
      </div>
    </div>
  );
};

export default ProductGallery;
