'use client';
import { useRouter } from 'next/navigation';

export default function Confirmation() {
  const router = useRouter();

  const handleFinish = () => {
    router.push('/');
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow max-w-2xl mx-auto text-gray-800">
      <div className="flex flex-col items-center mb-8">
        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl">
          ✓
        </div>
        <h2 className="text-2xl font-semibold mt-4">Pedido Confirmado!</h2>
        <p className="text-sm text-gray-500 mt-1">Pedido #ORD-2025-8742</p>
      </div>

      <h3 className="text-orange-500 font-semibold mb-3">Resumo do Pedido</h3>

      <div className="border rounded-md divide-y mb-6">
        {/* Produto 1 */}
        <div className="flex items-center gap-4 p-4">
          <div className="w-14 h-14 bg-gray-100 rounded-md" />
          <div className="flex-1">
            <p className="font-medium">camisa da UTA</p>
            <p className="text-sm text-gray-500">Branco | Tamanho: 42</p>
          </div>
          <p className="font-medium">299,905 CVE</p>
        </div>
        {/* Produto 2 */}
        <div className="flex items-center gap-4 p-4">
          <div className="w-14 h-14 bg-gray-100 rounded-md" />
          <div className="flex-1">
            <p className="font-medium">Calção laginha</p>
            <p className="text-sm text-gray-500">Preto | Tamanho: M</p>
          </div>
          <p className="font-medium">89,905 CVE</p>
        </div>
      </div>

      <div className="text-sm text-gray-700 space-y-1 mb-6">
        <div className="flex justify-between"><span>Subtotal</span><span>389,805 CVE</span></div>
        <div className="flex justify-between"><span>Frete</span><span>19,905 CVE</span></div>
        <div className="flex justify-between font-semibold text-base mt-2"><span>Total</span><span>409,705 CVE</span></div>
      </div>

      <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-700">
        <p className="font-semibold mb-1">Endereço de Entrega</p>
        <p>ramtih</p>
        <p>eu sou que fiz</p>
        <p>hellos meus</p>
        <p>Mindelo roms potndah</p>
      </div>

      <button onClick={handleFinish} className="bg-orange-400 hover:bg-orange-500 text-white font-medium w-full py-2 rounded-md mt-6 transition">
        Voltar à Página Inicial
      </button>
    </div>
  );
}
