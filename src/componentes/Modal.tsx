"use client";

import { X } from "lucide-react";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  showClose?: boolean;
  maxWidth?: string; // opcional, ex: 'max-w-lg'
}

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
  showClose = true,
  maxWidth = "max-w-xl",
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`bg-white rounded-lg shadow-lg w-full ${maxWidth} relative p-6`}
      >
        {showClose && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          >
            <X size={20} />
          </button>
        )}

        {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}

        <div>{children}</div>
      </div>
    </div>
  );
}
