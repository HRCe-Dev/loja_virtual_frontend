"use client";

export default function PoliticaDePrivacidade() {
  return (
    <div className="flex flex-col lg:flex-row-reverse gap-10 p-6 lg:p-16 max-w-screen-xl mx-auto">
      {/* Sidebar (à direita em telas grandes) */}
      <aside className="hidden lg:block w-1/4 sticky top-24 self-start">
        <ul className="space-y-2 text-sm text-blue-700">
          <li>
            <a href="#sobre">Sobre esta Política</a>
          </li>
          <li>
            <a href="#dados">Devoluções</a>
          </li>
          <li>
            <a href="#uso">Trocas</a>
          </li>
          <li>
            <a href="#direitos">Processo de Devoluções e Troca</a>
          </li>
          <li>
            <a href="#contactos">Contatos</a>
          </li>
        </ul>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 space-y-10 border-r lg:border-gray-200 pr-4 lg:pr-16">
        <section className="bg-gray-200  rounded-3xl flex items-center gap-4">
          <img src="/truck.png" alt="Ícone" className="w-30 h-25 p-4" />
          <h1 className="text-3xl font-bold">Política de Devoluções</h1>
        </section>

        <section id="sobre">
          <h2 className="text-xl font-semibold">Sobre esta Política</h2>
          <p className="text-gray-900 mt-2">
            Na HRCE Store, valorizamos a satisfação dos nossos clientes e nos
            esforçamos para garantir que você esteja completamente satisfeito
            com sua compra. No entanto, se por algum motivo você precisar
            devolver ou trocar um item, estamos aqui para ajudar.
          </p>
        </section>

        <section id="dados">
          <h2 className="text-xl font-semibold">Devoluções</h2>
          <p className="text-gray-900 mt-2">
            Aceitamos devoluções de produtos dentro de um prazo de 30 dias a
            partir da data da compra. O item deve estar na mesma condição em que
            foi recebido, sem sinais de uso ou danos. O cliente é responsável
            pelos custos de envio da devolução, a menos que o motivo da
            devolução seja um erro da nossa parte.
          </p>
        </section>

        <section id="uso">
          <h2 className="text-xl font-semibold">Trocas</h2>
          <p className="text-gray-700 mt-2">
            Aceitamos trocas de produtos dentro do mesmo prazo de 30 dias, desde
            que o item esteja em sua condição original. Se desejar trocar um
            item por um de valor diferente, o cliente será responsável pelo
            pagamento da diferença ou receberá um reembolso pela diferença de
            preço.
          </p>
        </section>

        <section id="direitos">
          <h2 className="text-xl font-semibold">
            Processo de Devolução e Troca
          </h2>
          <p className="text-gray-700">
            Entre em contato com nossa equipe de suporte ao cliente para iniciar
            o processo de devolução ou troca. Embale o item com segurança para
            evitar danos durante o transporte. Envie o item de volta para nós
            junto com o formulário de devolução preenchido. Assim que recebermos
            o item devolvido, processaremos o reembolso ou enviaremos o item de
            troca conforme solicitado.
          </p>
        </section>

        <section id="contacto" className="mb-10">
          <h2 className="text-xl font-semibold">Contactos</h2>
          <p className="text-gray-700 mt-2">
            Se tiver alguma dúvida sobre nossa política de devolução e troca,
            não hesite em nos contatar. Estamos aqui para ajudar e garantir que
            sua experiência de compra na HRCE Store seja sempre positiva.
          </p>
        </section>
      </main>
    </div>
  );
}
