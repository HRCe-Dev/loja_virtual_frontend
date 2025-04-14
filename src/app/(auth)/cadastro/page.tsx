import BannerCadastro from "./BannerCadastro";
import CadastroForm from "./CadastroForm";

export default function Cadastro() {
  return (
    <>
      <div className="flex">
        <div className=" w-1/2 ">
          <BannerCadastro />
        </div>
        <div className="w-1/2">
          <CadastroForm />
        </div>
      </div>
    </>
  );
}
