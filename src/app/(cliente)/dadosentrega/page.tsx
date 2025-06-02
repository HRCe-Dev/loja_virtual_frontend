
'use client';

import PedidoStepper from './PedidoStepper';

export default function PedidoStatusPage() {
  const faseAtual = 2; // Fase dinâmica no futuro

  return (
    <div className="min-h-screen bg-white rounded-2xl">
      {/* FASES DA ENTREGA */}
      <PedidoStepper current={faseAtual} />

      {/* RESUMO DO PEDIDO */}
      <section className="max-w-4xl mx-auto p-4 space-y-6">
        <h2 className="text-orange-500 font-semibold text-lg">Resumo do Pedido</h2>

        <div className="space-y-2">
          <div className="flex justify-between items-center border-b pb-2">
            <div>
              <p className="font-medium">camisa de UTA</p>
              <p className="text-xs text-gray-500">Branco | Tamanho: 42</p>
            </div>
            <span className="font-semibold">299,90$ CVE</span>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Calção laginha</p>
              <p className="text-xs text-gray-500">Preto | Tamanho: M</p>
            </div>
            <span className="font-semibold">89,90$ CVE</span>
          </div>
        </div>

        {/* TOTAIS */}
        <div className="text-right">
          <p className="text-sm text-gray-500">Subtotal: <strong>389,80$ CVE</strong></p>
          <p className="text-sm text-gray-500">Frete: <strong>19,90$ CVE</strong></p>
          <p className="text-lg font-semibold text-gray-800">Total: 409,70$ CVE</p>
        </div>

        {/* ENDEREÇO */}
        <div className="bg-gray-100 p-3 rounded-lg">
          <h3 className="font-semibold mb-1">Endereço de Entrega</h3>
          <p>nome</p>
          <p>346678</p>
          <p>hellios meus</p>
          <p>Mindelo roms potnadn</p>
        </div>

        {/* OBSERVAÇÕES */}
        <div className="bg-gray-100 p-3 rounded-lg text-sm text-gray-600">
          <p>ID do pedido: <strong>3049440712897676</strong></p>
          <p>Pedido feito em: 3 fev, 2025</p>
          <p>Pagamento concluído em: 3 fev, 2025</p>
          <p>Envio concluído em: 5 fev, 2025</p>
          <p>Pedido concluído em: 12 mar, 2025</p>
          <p>Forma de pagamento: <strong>Cartão de crédito</strong></p>
        </div>
      </section>
    </div>
  );
}
