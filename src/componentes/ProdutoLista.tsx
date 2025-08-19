import React from "react";

interface listaProps {
  children: React.ReactNode;
}

export const ProdutoListaLg: React.FC<listaProps> = ({ children }) => {
  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="flex md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5  gap-4 md:gap-6 w-max md:w-full">
        {children}
      </div>
    </div>
  );
};

export const ProdutoLista2: React.FC<listaProps> = ({ children }) => {
  return (
    <div className="">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 w-full">
        {children}
      </div>
    </div>
  );
};

export const ProdutoListaGrande: React.FC<listaProps> = ({ children }) => {
  return (
    <div>
      {/* Mobile: scroll horizontal */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide sm:hidden">
        <div className="flex gap-4 w-max">{children}</div>
      </div>

      {/* Desktop: grid responsiva */}
      <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {children}
      </div>
    </div>
  );
};
