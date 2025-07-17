import { MessageCircle } from "lucide-react";
import Link from "next/link";

type WhatsAppButtonProps = {
  message?: string;
  className?: string;
};

export const WhatsAppButton = ({
  message = "Olá",
  className = "",
}: WhatsAppButtonProps) => {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE;

  if (!phone) {
    console.warn("Número de WhatsApp não definido no .env");
    return null;
  }

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl shadow ${className}`}
    >
      <MessageCircle className="w-5 h-5" />
      WhatsApp
    </Link>
  );
};
