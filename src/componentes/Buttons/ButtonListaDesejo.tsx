import { Heart, Trash } from "lucide-react";

interface btnProps {
  onClick: () => void;
  title?: string;
}

interface btnLikeProps extends btnProps {
  liked: boolean;
}

export const BtnListaDesejo: React.FC = () => {
  return (
    <button
      className=" bg-white p-1 rounded-full shadow-md  group-hover:opacity-100 transition-opacity duration-300"
      title="Adicionar à Lista de Desejos"
    >
      <Heart className="w-5 h-5 text-gray-500 hover:text-red-500" />
    </button>
  );
};

export const BtnTrash: React.FC<btnProps> = ({ onClick, title }) => {
  return (
    <button
      className=" bg-white p-1 rounded-full shadow-md  group-hover:opacity-100 transition-opacity duration-300"
      title={title}
      onClick={onClick}
    >
      <Trash className="w-5 h-5 text-gray-500 hover:text-red-500" />
    </button>
  );
};
