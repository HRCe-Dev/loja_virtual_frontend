import React from "react";

interface listaProps {
  children: React.ReactNode;
}

//lista grande
//mostra todos os dados em children
export const ProdutoListaLg: React.FC<listaProps> = ({ children }) => {
  return (
    <div className="overflow-x-auto scrollbar-hide">
    <div className="flex md:grid md:grid-cols-4 gap-4 w-max md:w-full">
      {children}
    </div>
    </div>
  );
};

//TODO: lista pequena
//somente para um linha
/*
const ProdutoListaSm: React.FC<listaProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4  gap-5">
      {children}
    </div>
  );
};
*/
