"use client";
import Image from "next/image";
import React from "react";

export default function Contacto() {
  return (
    <div className="flex flex-col pb-10 pl-4">

      <div className="w-full max-w-2xl font-medium flex flex-col justify-center items-start mx-20 my-10 gap-2 text-center sm:text-left max-sm:text-left max-sm:mx-auto">
        <p className="text-4xl font-bold max-sm:text-2xl">Fala conosco</p>
        <p className="font-light text-2xl">
          Precisas de ajuda, tens dúvidas ou queres pedir uma proposta? Entra em contacto - respondemos rápido!
        </p>
      </div>

  
      <div className="w-full flex justify-end my-10 max-sm:my-0">
        <Image
          src="/img/mockup1.png"
          alt="Mockup 1"
          width={1000}
          height={300}
          className="w-3/4 max-w-3/4 object-cover max-sm:hidden h-96 overflow-visible mt-52"
        />

        <Image
          src="/img/mockup2.png"
          alt="Mockup 2"
          width={1000}
          height={300}
          className="w-full object-cover sm:hidden"
        />
      </div>


      <div className="font-medium flex flex-col justify-center items-start w-full max-w-md mx-20 my-8 max-sm:text-left max-sm:mx-auto mt-32">
        <p className="text-4xl max-sm:text-3xl">Informações de Contacto</p>
        <div className="flex flex-col gap-4 mt-5">
          <div className="flex gap-4 items-center">
            <div className="w-8">
              <Image src="/img/phone.png" alt="Telefone" width={100} height={100} className="w-full h-auto object-cover" />
            </div>
            <a href="tel:+2383478335" className="text-blue-900">(+238) 3478335</a>
          </div>

          <div className="flex gap-4 items-center">
            <div className="w-8">
              <Image src="/img/whatsapp.png" alt="WhatsApp" width={100} height={100} className="w-full h-auto object-cover" />
            </div>
            <a href="https://wa.me/2383478335" className="text-blue-900">(+238) 3478335</a>
          </div>

          <div className="flex gap-4 items-center">
            <div className="w-8">
              <Image src="/img/gmail.png" alt="Email" width={600} height={300} className="w-full h-auto object-cover" />
            </div>
            <a href="mailto:geral@hrcelda.com" className="text-blue-900">geral@hrcelda.com</a>
          </div>
        </div>
      </div>


      <div className="font-medium flex flex-col justify-center items-start w-full max-w-md mx-20 my-8  max-sm:text-left max-sm:mx-auto">
        <p className="text-2xl">Ou se preferir, entre em contacto conosco através de nossas redes:</p>
        <div className="flex gap-4 mt-5">
          <div className="w-8">
            <Image src="/img/facebook.png" alt="Facebook" width={100} height={100} className="w-full h-auto object-cover" />
          </div>
          <div className="w-8">
            <Image src="/img/instagram.png" alt="Instagram" width={100} height={100} className="w-full h-auto object-cover" />
          </div>
          <div className="w-8">
            <Image src="/img/linkedin.png" alt="LinkedIn" width={100} height={100} className="w-full h-auto object-cover" />
          </div>
        </div>
      </div>






      <div className="flex justify-center items-center mb-14 max-sm:mx-10">
        <form className="bg-[#265674] p-6 rounded-lg w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-4 text-white">
          <div className="flex flex-col">
            <label htmlFor="nome" className="text-sm font-semibold mb-1">Nome</label>
            <input type="text" id="nome" placeholder="Seu Nome" className="p-3 rounded text-black bg-white text-sm" />
          </div>

          <div className="flex flex-col">
            <label htmlFor="assunto" className="text-sm font-semibold mb-1">Assunto</label>
            <select id="assunto" className="p-3 rounded text-black bg-white text-sm" defaultValue="Dúvida">
              <option>Dúvida</option>
              <option>Orçamento</option>
              <option>Suporte</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-semibold mb-1">E-mail</label>
            <input type="email" id="email" placeholder="Seu E-mail" className="p-3 rounded text-black bg-white text-sm" />
          </div>

          <div className="flex flex-col">
            <label htmlFor="telefone" className="text-sm font-semibold mb-1">Telefone</label>
            <input type="text" id="telefone" placeholder="Seu Telefone" className="p-3 rounded text-black bg-white text-sm" />
          </div>

          <div className="flex flex-col sm:col-span-2">
            <label htmlFor="mensagem" className="text-sm font-semibold mb-1">Mensagem</label>
            <textarea id="mensagem" placeholder="Digite sua mensagem" className="p-3 rounded h-28 resize-none text-black bg-white text-sm" />
          </div>

          <div className="sm:col-span-2 flex justify-end">
            <button type="submit" className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600">
              Enviar
            </button>
          </div>
        </form>
      </div>


      <div className="px-4 sm:px-16">
        <Image src="/img/banner3.jpeg" alt="Banner" width={1000} height={100} className="w-full h-auto object-cover" />
      </div>
    </div>
  );
}
