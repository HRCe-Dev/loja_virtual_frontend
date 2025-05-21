import React from "react";

interface listaProps {
  children: React.ReactNode;
}

export const ProdutoListaLg: React.FC<listaProps> = ({ children }) => {
  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="flex md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-max md:w-full">
        {children}
      </div>
    </div>
  );
};



