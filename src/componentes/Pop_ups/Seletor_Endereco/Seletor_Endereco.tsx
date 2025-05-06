import { LocateFixed, MapPin } from "lucide-react";
import React from "react";

interface SeletorEnderecoProps {
  isOpen: boolean;
  onClose: () => void;
}

const SeletorEndereco: React.FC<SeletorEnderecoProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const localizacao = {
    ilha: "São Vicente",
    cidade: "Mindelo",
    zona: "Maderalzinho",
  };

  const selectStyle = "border border-gray-300 rounded-lg px-3 py-2";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 ">
      <div className="flex flex-col  gap-5 bg-white p-6 rounded-xl shadow-lg relative w-full max-w-md ">
        <div className="flex flex-row items-center justify-between ">
          <h1 className="text-2xl font-bold ">Selecionar Endereço</h1>
          <button
            onClick={() => onClose()}
            className="w-7 h-7  text-center text-xl font-bold  rounded-full hover:bg-gray-200"
          >
            x
          </button>
        </div>
        <div className="flex flex-col justify-center items-center gap-3">
          <div className="w-full border-dashed border-b-2 border-gray-300">
            <h3 className="flex flex-row justify-center mb-2 px-3 py-2 hover:bg-gray-200 hover:font-bold rounded-lg transition-all duration-300">
              <MapPin className="mr-2" />
              {localizacao.zona}, {localizacao.cidade}, {localizacao.ilha}
            </h3>
          </div>
          <div>
            <button className="mt-3 flex flex-row  gap-2 font-bold py-2 px-5 border border-dashed border-gray-300 rounded-lg text-orange-500  hover:border-solid hover:bg-blue-500 hover:text-white transition-all duration-300">
              <LocateFixed /> Usar Localização Atual
            </button>

            <form action="" className="flex flex-col mt-10 gap-5 ">
              <div className="flex flex-col">
                <label className="text-gray-700 font-bold" htmlFor="ilha">
                  Ilha
                </label>
                <select className={selectStyle} name="ilha" id="ilha">
                  <option value="">Selecione a ilha</option>
                  <option value="sa">Santo Antão</option>
                  <option value="sv">São Vicente</option>
                  <option value="sn">São Nicolau</option>
                </select>
              </div>

              <div className="flex flex-col ">
                <label className="font-bold text-gray-700" htmlFor="cidade">
                  Cidade
                </label>
                <select className={selectStyle} name="cidade" id="cidade">
                  <option value="">Selecione a cidade</option>
                  <option value="opcao1">Mindelo</option>
                  <option value="opcao2">Porto Novo</option>
                  <option value="opcao3">Ribeira Grande</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="font-bold text-gray-700" htmlFor="zona">
                  Zona
                </label>
                <select className={selectStyle} name="zona" id="zona">
                  <option value="">Selecione a zona</option>
                  <option value="opcao1">Maderalzinho</option>
                  <option value="opcao2">Chã de Alecrim</option>
                  <option value="opcao3">Alto Peixinho</option>
                </select>
              </div>

              <button className="my-6 text-white font-bold text-lg bg-orange-500 hover:text-orange-500 hover:bg-white border-orange-500 hover:border transition-colors duration-300 rounded-lg px-3 py-2">
                Confirmar o Endereço
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeletorEndereco;
