interface descripProps {
  descricaoText?: string | null;
}

const DescricaoProduto: React.FC<descripProps> = ({ descricaoText }) => {
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
