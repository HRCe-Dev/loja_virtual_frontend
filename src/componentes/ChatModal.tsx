import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { WhatsAppButton } from "./WhatsappButton";
import { MessengerButton } from "./FacebookChatButton";
const ChatModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {open && (
        <div className="flex flex-col items-end gap-2 transition-all">
          <span className="bg-white text-gray-800 px-3 py-1 rounded-lg shadow text-sm">
            Contactar o Vendedor
          </span>
          <WhatsAppButton className="w-[200px]" />
          <MessengerButton className="w-[200px]" />
        </div>
      )}

      <button
        onClick={() => setOpen((prev) => !prev)}
        className=" px-3 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg transition gap-2"
        aria-label="Contactar o Vendedor"
      >
        <span>Contactar Vendedor</span>
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ChatModal;
