import Image from "next/image";
import React from "react";

const BannerCadastro: React.FC = () => {
  return (
    <div>
      <Image src="/banner1.jpg" alt="Banner 1" width={600} height={300} />
    </div>
  );
};

export default BannerCadastro;
