// PedidoStepper.tsx
'use client';

type PedidoStepperProps = {
  current: number;
};

const fases = [
  'Em processamento',
  'Entregue ao correio',
  'Em viagem',
  'Correio final',
  'Entregue ao cliente',
];

export default function PedidoStepper({ current }: PedidoStepperProps) {
  return (
    <>
      {/* DESKTOP */}
      <div className="hidden md:flex items-center justify-center gap-2 max-w-4xl mx-auto pt-6 pb-6">
        {fases.map((label, index) => {
          const isActive = current === index + 1;
          const isCompleted = current > index + 1;

          return (
            <div key={index} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    isActive || isCompleted
                      ? 'bg-[#FF7700] text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {index + 1}
                </div>
                <span
                  className={`mt-2 text-xs font-medium w-15 text-center ${
                    isActive ? 'text-gray-800' : 'text-gray-400'
                  }`}
                >
                  {label}
                </span>
              </div>

              {index < fases.length - 1 && (
                <div className="h-1 w-30 bg-gray-200  relative mb-8">
                  <div
                    className={`h-1 ${
                      current > index + 1 ? 'bg-orange-400 w-full' : ''
                    }`}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* MOBILE */}
      <div className="flex md:hidden items-center justify-center gap-3 max-w-xs mx-auto pt-4 pb-6">
        {fases.map((label, index) => {
          const isActive = current === index + 1;
          const isCompleted = current > index + 1;

          return (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  isActive || isCompleted
                    ? 'bg-[#FF7700] text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {index + 1}
              </div>

              {isActive ? (
                <span className="text-[11px] mt-1 text-gray-800 font-medium text-center w-10">
                  {label}
                </span>
              ) : (
                <div className="w-6 h-[2px] bg-gray-400 mt-2 rounded-full" />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
