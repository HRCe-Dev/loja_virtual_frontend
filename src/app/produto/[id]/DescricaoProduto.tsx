interface descripProps {
  descricaoText?: string | null;
}

const DescricaoProduto: React.FC<descripProps> = ({ descricaoText }) => {
  const descricaoTextExample = `A Impressora Multifuncional HP DeskJet 2774 foi desenvolvida para facilitar o seu dia a dia, seja em casa ou no escritório. Compacta, elegante e eficiente, ela combina as funções de impressão, cópia e digitalização em um único equipamento, oferecendo versatilidade e economia de espaço.
<br/>
Com conectividade <b>Wi-Fi</b> integrada, você pode imprimir documentos e fotos diretamente do seu smartphone, tablet ou computador, sem a necessidade de fios. Além disso, a instalação é simples e rápida, permitindo que você comece a usar em poucos minutos. Seu desempenho silencioso e confiável garante impressões nítidas e de alta qualidade, tanto em preto e branco quanto coloridas.
<br/>
Ideal para estudantes, profissionais e famílias, a HP DeskJet 2774 também se destaca pelo baixo consumo de energia e compatibilidade com cartuchos econômicos, ajudando você a reduzir custos sem abrir mão da qualidade. Pronta para atender às demandas do seu dia a dia com praticidade, esta impressora é a escolha certa para quem busca funcionalidade, conectividade e excelente custo-benefício.`;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-6 border border-gray-200 rounded-md shadow-sm bg-white">
      <div className=" w-full border-b border-gray-300 py-2 hover:bg-gray-200">
        <h1 className="text-xl md:text-2xl font-bold inline-block border-b-4 border-orange-500 pb-1 px-2">
          Descrição
        </h1>
      </div>

      <div className="mt-4">
        <div
          className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-800 max-w-none"
          dangerouslySetInnerHTML={{
            __html: descricaoText ?? "",
          }}
        />
      </div>
    </div>
  );
};

export default DescricaoProduto;
