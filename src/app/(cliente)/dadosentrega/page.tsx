// EnderecosEntrega.tsx

import { ChevronLeft, MoreVertical, Home, Building2, Users } from 'lucide-react';

const enderecos = [
  {
    tipo: 'Casa',
    icone: <Home className="text-blue-500" />,
    logradouro: 'Rua das Flores, 123',
    bairro: 'Jardim América',
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '06234-567',
  },
  {
    tipo: 'Trabalho',
    icone: <Building2 className="text-blue-500" />,
    logradouro: 'Av. Paulista, 1000',
    bairro: 'Bela Vista',
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '01310-100',
  },
  {
    tipo: 'Casa dos Pais',
    icone: <Users className="text-blue-500" />,
    logradouro: 'Rua dos Pinhais, 500',
    bairro: 'Pinheiros',
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '05422-004',
  },
];

export default function EnderecosEntrega() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Cabeçalho */}
      <div className="flex items-center p-4 border-b">
        <ChevronLeft className="text-gray-600 mr-2" />
        <h1 className="text-lg font-semibold">Endereços de entrega</h1>
      </div>

      {/* Lista de endereços */}
      <div className="flex-1 p-4 space-y-4">
        {enderecos.map((endereco, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-xl shadow-sm flex items-start justify-between"
          >
            <div className="flex gap-3">
              <div className="mt-1">{endereco.icone}</div>
              <div>
                <p className="font-semibold">{endereco.tipo}</p>
                <p className="text-sm text-gray-700">{endereco.logradouro}</p>
                <p className="text-sm text-gray-700">
                  {endereco.bairro} - {endereco.cidade}, {endereco.estado}
                </p>
                <p className="text-sm text-gray-700">CEP: {endereco.cep}</p>
              </div>
            </div>
            <MoreVertical className="text-gray-400 cursor-pointer" />
          </div>
        ))}
      </div>

      {/* Botão adicionar novo endereço */}
      <div className="p-4 bg-white border-t">
        <button className="w-full bg-orange-500 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-orange-600 transition">
          <span className="text-xl">+</span>
          Adicionar novo endereço
        </button>
      </div>
    </div>
  );
}
