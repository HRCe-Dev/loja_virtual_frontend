import { Trash } from "lucide-react";
import React from "react";

interface btnProps0 {
  onClick?: () => void;
  title?: string;
  disable?: boolean;
}

interface btnProps extends btnProps0 {
  children: React.ReactNode;
}

export const ButtonLaranja: React.FC<btnProps> = ({
  children,
  onClick,
  title,
}) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-row items-center justify-center gap-2 py-1 px-2 bg-orange-500 text-lg font-bold text-white rounded-lg hover:bg-orange-700"
      title={title}
    >
      {children}
    </button>
  );
};

export const ButtonWhite: React.FC<btnProps> = ({
  children,
  onClick,
  title,
}) => {
  return (
    <button
      onClick={onClick}
      className="py-1 px-2 bg-white text-lg font-bold  text-orange-500 rounded-lg border-1 border-orange-500 hover:bg-orange-700 hover:text-white "
      title={title}
    >
      {children}
    </button>
  );
};

//btn sem fundo, mas em hover o fundo é transparente
export const ButtonNoBg: React.FC<btnProps> = ({
  children,
  onClick,
  title,
}) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-row  items-center justify-center gap-2 py-1 px-4 font-bold text-sm hover:bg-gray-200 hover:border-1 border-orange-500 rounded-md"
      title={title}
    >
      {children}
    </button>
  );
};

export const BtnTrash: React.FC<btnProps0> = ({ onClick, title, disable }) => {
  return (
    <button
      className=" bg-white p-1 rounded-full shadow-md  group-hover:opacity-100 transition-opacity duration-300"
      title={title}
      onClick={onClick}
      disabled={disable}
    >
      <Trash className="w-5 h-5 text-gray-500 hover:text-red-500" />
    </button>
  );
};
