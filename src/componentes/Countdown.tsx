import { useEffect, useState } from "react";

type CountdownProps = {
  dataFim: Date | string;
};

export default function Countdown({ dataFim }: CountdownProps) {
  const [tempoRestante, setTempoRestante] = useState("00:00:00:00");

  useEffect(() => {
    const fim = new Date(dataFim).getTime();

    const atualizar = () => {
      const agora = Date.now();
      const diff = fim - agora;

      if (diff <= 0) {
        setTempoRestante("00:00:00:00");
        return;
      }

      const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
      const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutos = Math.floor((diff / (1000 * 60)) % 60);
      const segundos = Math.floor((diff / 1000) % 60);

      const format = (n: number) => n.toString().padStart(2, "0");

      setTempoRestante(
        `${format(dias)}:${format(horas)}:${format(minutos)}:${format(
          segundos
        )}`
      );
    };

    atualizar(); // chamada imediata
    const interval = setInterval(atualizar, 1000);

    return () => clearInterval(interval);
  }, [dataFim]);

  return (
    <div className="flex items-center gap-1 text-sm px-2 py-1 rounded bg-transparent  font-bold">
      <span>{tempoRestante}</span>
    </div>
  );
}
