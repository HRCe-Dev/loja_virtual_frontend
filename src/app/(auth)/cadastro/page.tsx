import Link from "next/link";
import BannerCadastro from "./BannerCadastro";
import CadastroForm from "./CadastroForm";

export default function Cadastro() {
  return (
    <>
      <div className="flex">
        <div className="hidden md:block w-1/2 ">
          <BannerCadastro />
        </div>
        <div className="w-full md:w-1/2">
          <CadastroForm />

          <p className="text-sm text-gray-700 text-center mt-16">
            Já tens uma conta?{" "}
            <Link
              className="text-orange-500 hover:text-orange-900"
              href="/login"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
