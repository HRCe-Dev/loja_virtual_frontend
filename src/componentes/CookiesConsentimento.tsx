import React from "react";

const CookiesConsentimento: React.FC = () => {
  return (
    <div className="bg-cyan-900 py-3">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-xs text-gray-300">
        <p>
          Este site utiliza cookies para permitir uma melhor experiência por
          parte do utilizador. Ao navegar no site estará a consentir a sua
          utilização.
        </p>
        <button className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-1 rounded">
          Aceitar
        </button>
      </div>
    </div>
  );
};

export default CookiesConsentimento;
