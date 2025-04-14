import Image from "next/image";
import React from "react";

const BannerCadastro: React.FC = () => {
  return (
    <div className="max-md:hidden">
      <Image
        src="/banner1.jpg"
        alt="Banner 1"
        width={600}
        height={300}
        className="w-full h-auto object-cover"
      />
    </div>
  );
};

export default BannerCadastro;
