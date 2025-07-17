import Error from "@/componentes/Error";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <div>
      <Error>Erro no pagamento</Error>
      <div className="mt-4 p-4 border border-gray-300 rounded-lg bg-gray-50 flex flex-col items-center justify-center">
        <p>Em caso de problema, por favor entre em contacto:</p>
        <p>
          Email:{" "}
          <a
            href="mailto:geral@hrcelda.com"
            className="text-blue-600 underline"
          >
            geral@hrcelda.com
          </a>
        </p>
        <p>
          Telefone:{" "}
          <a href="tel:+2389791938" className="text-blue-600 underline">
            +238 9791938
          </a>{" "}
          |{" "}
          <a href="tel:+2383478335" className="text-blue-600 underline">
            +238 3478335
          </a>
        </p>
        <Link
          href="/"
          className="text-center text-white font-semibold bg-orange-500 hover:bg-orange-500/50 rounded-2xl px-3 py-2 mt-10"
        >
          Voltar Pagina Inicial
        </Link>
      </div>
    </div>
  );
}
