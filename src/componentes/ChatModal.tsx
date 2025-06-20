import { useState } from "react";
import { Send, X } from "lucide-react";

export default function ChatModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botão de abrir o chat (posição normal, sem fixed) */}
      {!isOpen && (
        <div className="flex justify-end pr-6 pt-4">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-[#265674] text-white p-4 rounded-full shadow-lg hover:bg-[#297884] transition"
          >
            Conversar com vendedor
          </button>
        </div>
      )}

      {/* Modal de Chat (fixo no canto inferior direito) */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 bg-[#265674] rounded-xl shadow-xl flex flex-col overflow-hidden z-50">
          {/* Cabeçalho */}
          <div className="bg-[#265674] text-white p-4 flex justify-between items-center border-b border-gray-300">
            <div className="flex items-center gap-2">
                <img
                src="/vendedor.jpg" // substitua pelo caminho da imagem
                alt="Avatar do Vendedor"
                className="w-8 h-8 rounded-full object-cover"
                />
                <span className="font-semibold">Nome do Vendedor</span>
            </div>
            <button onClick={() => setIsOpen(false)}>
                <X size={20} />
            </button>
          </div>


          {/* Corpo do chat */}
          <div className="flex-1 p-4 space-y-2 overflow-y-auto h-64">
            <div className=" p-2 rounded-md shadow w-fit max-w-[70%] bg-white">
              Olá! Como posso te ajudar?
            </div>
            <div className="bg-white p-2 rounded-md shadow w-fit max-w-[70%] ml-auto">
              Quero saber o status do meu pedido.
            </div>
          </div>

          {/* Campo de entrada */}
            <div className="p-3 bg-[#265674] border-t border-gray-300">
            <div className="relative">
                <input
                type="text"
                placeholder="Escrever algo aqui..."
                className="w-full border border-gray-300 bg-white rounded-full px-4 py-2 pr-20 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                />
                <button
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[#265674] font-bold text-sm hover:underline"
                >
                <Send size={20} />
                </button>
            </div>
            </div>
        </div>
      )}
    </>
  );
}
