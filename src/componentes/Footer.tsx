import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-5 text-center">
      <div className="max-w-screen-xl mx-auto px-4">
        <p className="mb-3">
          © {new Date().getFullYear()} HRCe Store. Todos os direitos reservados.
        </p>
        <nav>
          <a href="/sobre" className="text-white hover:underline mx-2">
            Sobre
          </a>{" "}
          |
          <a href="/contato" className="text-white hover:underline mx-2">
            Contato
          </a>{" "}
          |
          <a
            href="/politica-de-privacidade"
            className="text-white hover:underline mx-2"
          >
            Política de Privacidade
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
