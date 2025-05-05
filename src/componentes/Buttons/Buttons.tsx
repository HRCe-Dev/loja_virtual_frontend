import React from "react";

interface btnProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const ButtonLaranja: React.FC<btnProps> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-row items-center justify-center gap-2 py-1 px-2 bg-orange-500 text-lg font-bold text-white rounded-lg hover:bg-orange-700"
    >
      {children}
    </button>
  );
};

const ButtonWhite: React.FC<btnProps> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="py-1 px-2 bg-white text-lg font-bold  text-orange-500 rounded-lg border-1 border-orange-500 hover:bg-orange-700 hover:text-white "
    >
      {children}
    </button>
  );
};

//btn sem fundo, mas em hover o fundo é transparente
const ButtonNoBg: React.FC<btnProps> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-row  items-center justify-center gap-2 py-1 px-4 font-bold text-sm hover:bg-gray-200 hover:border-1 border-orange-500 rounded-md"
    >
      {children}
    </button>
  );
};

export { ButtonLaranja, ButtonWhite, ButtonNoBg };
