import Link from "next/link";

// app/(dashboard)/historico/page.tsx
export default function HistoricoPage() {
  return (
    <Link href='/historico/detalhesentrega'>
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h1 className="text-xl font-semibold mb-6">Histórico de Compras</h1>

      {[1, 2].map((item) => (
        <div
          key={item}
          className="border p-4 rounded-lg mb-4 flex justify-between items-center"
        >
          <div>
            <div className="text-sm bg-orange-100 text-orange-600 px-2 py-1 rounded w-fit mb-2">
              Entregue
            </div>
            <p className="font-bold">Pedido #1004{item}</p>
            <p className="text-sm text-gray-500">Realizado em 17/05/25</p>

            <div className="flex items-center gap-2 mt-2">
              <div className="w-12 h-12 bg-gray-100 flex items-center justify-center rounded">
                📦
              </div>
              <div>
                <p className="text-sm font-medium">Produto 1</p>
                <p className="text-xs text-gray-500">Quantidade: 1</p>
              </div>
            </div>

            <div className="flex gap-4 mt-2 text-sm text-orange-500">
              <button className="hover:underline">Ver detalhes</button>
              <button className="hover:underline">Comprar novamente</button>
            </div>
          </div>

          <div className="text-right font-semibold text-orange-600">
            10.000 CVE
          </div>
        </div>
      ))}

      <div className="text-center mt-6">
        <button className="border border-orange-500 text-orange-500 px-4 py-2 rounded hover:bg-orange-50">
          Ver mais pedidos
        </button>
      </div>
    </div>
    </Link>
  );
}
