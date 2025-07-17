import React from "react";

type MoedaProps = {
  children: React.ReactNode;
  className?: string;
};

const formatarValor = (valor: number): string => {
  const partes = valor.toFixed(0).split("").reverse();

  const formatado = partes.reduce((acc, char, index) => {
    if (index !== 0 && index % 3 === 0) {
      acc.push(".");
    }
    acc.push(char);
    return acc;
  }, [] as string[]);

  return formatado.reverse().join("");
};

export const Moeda: React.FC<MoedaProps> = ({ children, className }) => {
  let valorNumerico: number;

  if (typeof children === "string" || typeof children === "number") {
    valorNumerico = Number(children);
    if (isNaN(valorNumerico)) {
      return <span className={`${className}`}>Valor inválido</span>;
    }
  } else {
    return <span className={className}>Formato não suportado</span>;
  }

  const valorFormatado = formatarValor(valorNumerico);

  return (
    <span className={className}>
      {valorFormatado} <span className="text-sm">$CVE</span>
    </span>
  );
};

export default Moeda;
