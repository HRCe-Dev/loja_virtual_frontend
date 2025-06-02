'use client';

import { useState } from 'react';
import { Pencil } from 'lucide-react';
import PerfilModal from './PerfilModal';
import AlterarPasswordModal from './PasswordModal';

export default function PerfilView() {
  const [dados, setDados] = useState<{
    nome: string;
    apelido: string;
    nascimento: string;
    telefone: string;
    ilha: string;
    zona: string;
    foto: File | null;
  }>({
    nome: 'Nome',
    apelido: 'Apelido',
    nascimento: '20/00/2003',
    telefone: '9504192',
    ilha: 'Ilha',
    zona: 'Zona',
    foto: null,
  });


  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalSenha, setMostrarModalSenha] = useState(false);


  return (
    <div className="bg-white p-6 rounded-xl shadow-md relative">
      <h1 className="text-xl font-semibold mb-6">Meu perfil</h1>

      <button
        className="absolute top-4 right-4 text-orange-500 hover:text-orange-600"
        onClick={() => setMostrarModal(true)}
      >
        <Pencil size={20} />
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-sm text-gray-500">Primeiro Nome</p>
          <p className="font-medium">{dados.nome}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Apelido</p>
          <p className="font-medium">{dados.apelido}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Data de Nascimento</p>
          <p className="font-medium">{dados.nascimento}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Telemóvel</p>
          <p className="font-medium">+238 {dados.telefone}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Zona</p>
          <p className="font-medium">{dados.zona}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Ilha</p>
          <p className="font-medium">{dados.ilha}</p>
        </div>
      </div>

      <button onClick={() => setMostrarModalSenha(true)}
        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
        Alterar Password
      </button>

      {mostrarModalSenha && (
        <AlterarPasswordModal
          onFechar={() => setMostrarModalSenha(false)}
          onSalvar={(dados) => {
            console.log('Nova senha:', dados);
            setMostrarModalSenha(false);
          }}
        />
      )}

      {mostrarModal && (
        <PerfilModal
          dadosIniciais={dados}
          onFechar={() => setMostrarModal(false)}
          onAtualizar={(novosDados) => {
            setDados(novosDados);
            setMostrarModal(false);
          }}
        />
      )}
    </div>
  );
}
