import { Facebook } from "lucide-react";
import Link from "next/link";

type MessengerButtonProps = {
  className?: string;
  defaultMessage?: string;
};

export const MessengerButton = ({
  className = "",
  defaultMessage = "",
}: MessengerButtonProps) => {
  const pageId = process.env.NEXT_PUBLIC_MESSENGER_PAGE_ID;

  if (!pageId) {
    console.warn("⚠️ Messenger Page ID/Username não está definido no .env");
    return null;
  }

  const baseUrl = `https://m.me/${pageId}`;
  const fullUrl = defaultMessage
    ? `${baseUrl}?ref=${encodeURIComponent(defaultMessage)}`
    : baseUrl;

  return (
    <Link
      href={fullUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow ${className}`}
    >
      <Facebook className="w-5 h-5" />
      Messenger
    </Link>
  );
};
