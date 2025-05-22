'use client';

type StepperProps = {
  current: number;
};

const steps = ['Cadastro', 'Entrega', 'Pagamento', 'Confirmação'];

export default function Stepper({ current }: StepperProps) {
  return (
    <>
      <div className="hidden md:flex items-center justify-center gap-2 max-w-4xl mx-auto mt-4 mb-4">
        {steps.map((label, index) => {
          const isActive = current === index + 1;
          const isCompleted = current > index + 1;
          const isNext = current < index + 1;

          return (
            <div key={index} className="flex items-center">
              {/* Step bolinha + texto */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    isActive || isCompleted
                      ? 'bg-orange-400 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {index + 1}
                </div>
                <span
                  className={`mt-2 text-xs font-medium ${
                    isNext ? 'text-gray-400' : 'text-gray-800'
                  }`}
                >
                  {label}
                </span>
              </div>

              {/* Linha (exceto no último) */}
              {index < steps.length - 1 && (
                <div className="h-1 w-42 bg-gray-200 mx-2 relative">
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

      {/* MOBILE/TABLET (até md) */}
      <div className="flex md:hidden items-center justify-center gap-4 max-w-xs mx-auto mt-4 mb-6">
        {steps.map((label, index) => {
          const isActive = current === index + 1;
          const isCompleted = current > index + 1;

          return (
            <div key={index} className="flex flex-col items-center">
              {/* Círculo com número */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                  isActive || isCompleted
                    ? 'bg-orange-400 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {index + 1}
              </div>

              {/* Nome do passo atual */}
              {isActive && (
                <span className="text-[12px] mt-2 text-gray-800 font-medium">
                  {label}
                </span>
              )}

              {/* Traço nos demais */}
              {!isActive && <div className="w-8 h-[2px] bg-gray-400 mt-2 rounded-full" />}
            </div>
          );
        })}
      </div>
    </>
  );
}
