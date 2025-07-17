"use client";

export default function PoliticaDePrivacidade() {
  const listyle = "w-1/2 border border-gray-300 rounded-full p-2 mb-2";

  return (
    <div className="flex flex-col lg:flex-row-reverse gap-10 p-6 lg:p-16 max-w-screen-xl mx-auto">
      {/* Sidebar (à direita em telas grandes) */}
      <aside className="hidden lg:block w-1/4 sticky top-24 self-start">
        <ul className="space-y-2 text-sm text-blue-700">
          <li>
            <a href="#sobre">Sobre esta Política</a>
          </li>
          <li>
            <a href="#dados">Dados que Recolhemos</a>
          </li>
          <li>
            <a href="#uso">Como e Porquê Utilizamos os Dados</a>
          </li>
          <li>
            <a href="#direitos">Direitos do Utilizador</a>
          </li>
          <li>
            <a href="#partilha">Partilha e Transferência de Dados</a>
          </li>
          <li>
            <a href="#seguranca">Segurança das Informações</a>
          </li>
          <li>
            <a href="#links">Links Externos</a>
          </li>
          <li>
            <a href="#legal">Declaração Legal</a>
          </li>
          <li>
            <a href="#contacto">Contactos</a>
          </li>
        </ul>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 space-y-10 border-r lg:border-gray-200 pr-4 lg:pr-16">
        <section className="bg-gray-200  rounded-3xl flex items-center gap-4">
          <img src="/lock.png" alt="Ícone" className="w-30 h-30" />
          <div>
            <h1 className="text-3xl font-bold">Política de Privacidade</h1>
            <p className="text-gray-700">
              Transparência e segurança para seus dados
            </p>
          </div>
        </section>

        <section id="sobre">
          <h2 className="text-xl font-semibold">Sobre esta Política</h2>
          <p className="text-gray-900 mt-2">
            Esta Política de Privacidade descreve como a HRCE Store recolhe,
            utiliza e partilha os seus dados pessoais quando visita ou faz
            compras no nosso website.
          </p>
          <p className="text-gray-900 mt-2">
            A presente política foi atualizada pela ultima vez em 15 de Maio de
            2024 e aplica-se a todos os utilizadores da nossa plataforma.
          </p>
        </section>

        <section id="dados">
          <h2 className="text-xl font-semibold">Dados que Recolhemos</h2>
          <ul className="mt-2 list-none list-inside space-y-1 text-gray-700">
            <li className={listyle}>Informações Pessoais</li>
            <li className={listyle}>Informações Automatizadas</li>
            <li className={listyle}>Cookies e Tecnologias Similares</li>
          </ul>
        </section>

        <section id="uso">
          <h2 className="text-xl font-semibold">
            Como e Porquê Utilizamos os Dados
          </h2>
          <p className="text-gray-700 mt-2">
            Utilizamos os dados pessoais que recolhemos para:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="border rounded-xl p-4">
              <h3 className="font-semibold">Processar Encomendas</h3>
              <p className="text-gray-600 text-sm">
                Processar e entregar os seus pedidos, confirmar pagamentos e
                fornecer apoio ao cliente.
              </p>
            </div>
            <div className="border rounded-xl p-4">
              <h3 className="font-semibold">Personalizar Experiência</h3>
              <p className="text-gray-600 text-sm">
                Oferecer produtos, conteúdo e funcionalidades que possam ser do
                seu interesse.
              </p>
            </div>
            <div className="border rounded-xl p-4">
              <h3 className="font-semibold">Segurança</h3>
              <p className="text-gray-600 text-sm">
                Proteger a nossa plataforma, utilizadores e prevenir atividades
                fraudulentas.
              </p>
            </div>
            <div className="border rounded-xl p-4">
              <h3 className="font-semibold">Marketing</h3>
              <p className="text-gray-600 text-sm">
                Enviar informações sobre promoções, novos produtos e outras
                comunicações (com seu consentimento).
              </p>
            </div>
          </div>
        </section>

        <section id="direitos">
          <h2 className="text-xl font-semibold">Direitos do Utilizador</h2>
          <p className="text-gray-700">
            De acordo com a legislacao de protecao de dados aplicavel, voce tem
            os seguintes direitos:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1 text-gray-700">
            <li>
              Direito de acesso: Solicitar uma copia dos seus dados pessoais.
            </li>
            <li>
              Direito de retificação: Corrigir dados incorretos ou incompletos.
            </li>
            <li>
              Direito ao esquecimento: Solicitar a eliminação dos seus dados
              pessoais.
            </li>
            <li>
              Direito à limitação: Solicitar a restrição do processamento dos
              seus dados.
            </li>
            <li>
              Direito à portabilidade: Receber os seus dados num formato
              estruturado.
            </li>
            <li>
              Direito de oposição: Opor-se ao processamento dos seus dados
              pessoais.
            </li>
          </ul>
        </section>

        <section id="partilha">
          <h2 className="text-xl font-semibold">
            Partilha e Transferência de Dados
          </h2>
          <p className="text-gray-700 mt-2">
            Podemos partilhar os seus dados pessoais com:
          </p>
          <div className="border rounded-xl p-4 mt-3">
            <h3 className="font-semibold">Prestadores de Serviços</h3>
            <p className="text-gray-600 text-sm">
              Empresas que nos ajudam a operar o nosso website, conduzir o nosso
              negocio ou fornecer serviços, desde que concordem em manter estas
              informações confidenciais.
            </p>
          </div>
          <div className="border rounded-xl p-4 mt-2">
            <h3 className="font-semibold">Requisitos Legais</h3>
            <p className="text-gray-600 text-sm">
              Quando acreditamos que a divulgação e necessária para cumprir a
              lei, fazer cumprir as nossas politicas ou proteger direitos,
              propriedade ou segurança.
            </p>
          </div>
        </section>

        <section id="seguranca">
          <h2 className="text-xl font-semibold">Segurança das Informações</h2>
          <p className="text-gray-700 mt-2">
            Implementamos medidas de segurança adequadas para proteger os seus
            dados pessoais contra perda acidental, uso indevido, acesso nao
            autorizado, alteração ou divulgação.
          </p>
          <div className="border rounded-xl p-4 mt-3">
            <h3 className="font-semibold">Proteção SSL</h3>
            <p className="text-gray-600 text-sm">
              Todas as informações sensíveis transmitidas através do nosso
              website sao protegidas por criptografia SSL (Secure Socket Layer).
            </p>
          </div>
        </section>

        <section id="links">
          <h2 className="text-xl font-semibold">Links Externos</h2>
          <p className="text-gray-700 mt-2">
            Reservamo-nos o direito de atualizar esta politica de privacidade
            periodicamente. Publicaremos quaisquer alterações no nosso website
            e, se as alterações forem significativas, notificaremos por email ou
            através de um aviso no nosso website.
          </p>
        </section>

        <section id="contacto" className="mb-10">
          <h2 className="text-xl font-semibold">Contactos</h2>
          <p className="text-gray-700 mt-2">
            Se tiver alguma questao sobre esta Politica de Privacidade, por
            favor contacte-nos:
          </p>
          <div className="mt-4">
            <textarea
              maxLength={500}
              placeholder="Escreva a sua mensagem (máx. 500 caracteres)"
              className="w-full h-32 p-4 bg-gray-200 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            />
          </div>
        </section>
      </main>
    </div>
  );
}
