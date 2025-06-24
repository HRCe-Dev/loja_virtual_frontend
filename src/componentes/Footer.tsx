import React from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className="bg-cyan-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex flex-col gap-2  w-full ">
              <Link href="https://hrcelda.com" className="flex">
                <Image
                  src="/HRC - Branca.svg"
                  alt="hrce logo"
                  width={130}
                  height={130}
                  className="h-auto"
                />
              </Link>

              <p className="text-sm text-gray-300 mb-4">
                Soluções completas em Contabilidade, Tecnologia da Informação,
                Formação e Vendas para impulsionar o crescimento do seu negócio.
              </p>
            </div>

            <div className="flex space-x-3">
              <a
                href="#"
                className="text-white hover:text-orange-300 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-white hover:text-orange-300 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-white hover:text-orange-300 transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Serviços</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-white">
                  Contabilidade
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Tecnologia da Informação
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Formação
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Vendas
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Links úteis</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <a href="/politicaPrivacidade" className="hover:text-white">
                  Política de privacidade
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Termos de uso
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Contato</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center">
                <MapPin size={16} className="mr-2 flex-shrink-0" />
                <span>Praia, Cabo Verde</span>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2 flex-shrink-0" />
                <span>geral@hrcelda.com</span>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2 flex-shrink-0" />
                <span>+238 9791938 | +238 3478335</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-cyan-700 py-4">
        <Link
          href="https://hrcelda.com"
          className="container mx-auto px-4 text-center text-sm text-gray-300 hover:text-orange-500"
        >
          <p>© HRCe, LDA 2025 | Todos os Direitos Reservados.</p>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
