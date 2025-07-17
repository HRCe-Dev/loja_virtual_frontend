import React from "react";

interface props {
  children?: React.ReactNode;
}

const Error: React.FC<props> = ({ children }) => {
  return (
    <div className="my-20 text-center ">
      <h1 className="text-3xl font-bold text-orange-500 text-center">
        {children ? children : "ERRO EM CARREGAR OS PRODUTOS ..."}
      </h1>
    </div>
  );
};

export default Error;
