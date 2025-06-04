"use client";

import { useEffect, useState } from "react";
import { IntervalSlider } from "@/components/ui/slider";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AtributosProdutos, SearchQuery } from "@/types/Produto";
import { useObterAtributosProdutos } from "@/api/produtos.api";

interface props {
  filtros: Partial<SearchQuery> | null;
  setFiltros: React.Dispatch<React.SetStateAction<Partial<SearchQuery> | null>>;
}

const FiltroSidebar: React.FC<props> = ({ setFiltros, filtros }) => {
  const [atributos, setAtributos] = useState<AtributosProdutos | null>(null);
  const [preco, setPreco] = useState([0, 5000]); // valor inicial do intervalo

  const [mostrarCategoria, setMostrarCategoria] = useState(true);
  const [mostrarSubcategoria, setMostrarSubcategoria] = useState(true);
  const [mostrarPreco, setMostrarPreco] = useState(true);
  const [mostrarAvaliacao, setMostrarAvaliacao] = useState(true);
  const [mostrarLojas, setMostrarLojas] = useState(true);
  const [precoTimeout, setPrecoTimeout] = useState<NodeJS.Timeout | null>(null);

  useObterAtributosProdutos(setAtributos, []);

  useEffect(() => {
    if (atributos?.preco_max && atributos?.preco_min)
      setPreco([atributos?.preco_min, atributos?.preco_max]);
  }, [atributos?.preco_max]);

  // Atualiza filtro de preço com debounce de 2 segundos
  useEffect(() => {
    if (atributos) {
      if (precoTimeout) clearTimeout(precoTimeout);

      const timeout = setTimeout(() => {
        setFiltros((prev) => ({
          ...prev,
          precomin: preco[0].toString(),
          precomax: preco[1].toString(),
        }));
      }, 2000);

      setPrecoTimeout(timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preco]);

  if (atributos)
    return (
      <aside className="w-full p-4 bg-white rounded-lg shadow mr-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Filtros</h2>
          {/* Aqui você pode adicionar botão geral de ocultar tudo se quiser */}
        </div>

        {/* Categoria */}
        <div className="mb-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setMostrarCategoria(!mostrarCategoria)}
          >
            <h3 className="font-medium">Categoria</h3>
            {mostrarCategoria ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </div>
          {mostrarCategoria && (
            <div className="mt-2">
              {atributos.categorias &&
                atributos.categorias.map((cat) => (
                  <div
                    key={cat.id}
                    className="flex items-center space-x-2 mb-1"
                  >
                    <input
                      type="checkbox"
                      id={`cat-${cat.id}`}
                      className="accent-orange-500"
                      onChange={(e) => {
                        setFiltros((prev) => ({
                          ...prev,
                          categoria: e.target.checked
                            ? cat.id.toString()
                            : undefined,
                        }));
                      }}
                    />
                    <label htmlFor={`cat-${cat.id}`} className="text-sm">
                      {cat.nome}
                    </label>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Subcategoria */}
        <div className="mb-4 hidden">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setMostrarSubcategoria(!mostrarSubcategoria)}
          >
            <h3 className="font-medium">Subcategoria</h3>
            {mostrarSubcategoria ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </div>
          {mostrarSubcategoria && (
            <p className="text-sm text-gray-500 mt-2">—</p>
          )}
        </div>

        {/* Preço */}
        <div className="mb-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setMostrarPreco(!mostrarPreco)}
          >
            <h3 className="font-medium">Preço</h3>
            {mostrarPreco ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
          {mostrarPreco && (
            <div className="mt-2">
              <IntervalSlider
                value={preco}
                onValueChange={setPreco}
                min={atributos.preco_min}
                max={atributos.preco_max}
                step={50}
              />
              <div className="text-sm text-gray-500 mt-2">
                {preco[0]}$00 CVE – {preco[1]}$00 CVE
              </div>
            </div>
          )}
        </div>
        {/* Avaliação */}
        <div className="mb-4 hidden">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setMostrarAvaliacao(!mostrarAvaliacao)}
          >
            <h3 className="font-medium">Avaliação</h3>
            {mostrarAvaliacao ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </div>
          {mostrarAvaliacao && (
            <div className="mt-2">
              {[5, 4, 3, 2, 1].map((n) => (
                <div key={n} className="flex items-center space-x-2 mb-1">
                  <input
                    type="checkbox"
                    id={`estrela-${n}`}
                    className="accent-orange-500"
                  />
                  <label
                    htmlFor={`estrela-${n}`}
                    className="flex space-x-1 text-yellow-400"
                  >
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i} className={i < n ? "" : "opacity-30"}>
                        ★
                      </span>
                    ))}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Lojas */}
        <div className="hidden">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setMostrarLojas(!mostrarLojas)}
          >
            <h3 className="font-medium">Lojas</h3>
            {mostrarLojas ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
          {mostrarLojas && (
            <div className="mt-2">
              {["HRCe", "Loja Y", "Loja X"].map((loja, idx) => (
                <div key={idx} className="flex items-center space-x-2 mb-1">
                  <input
                    type="checkbox"
                    id={`loja-${idx}`}
                    className="accent-orange-500"
                  />
                  <label htmlFor={`loja-${idx}`} className="text-sm">
                    {loja}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>
    );
  else return <></>;
};

export default FiltroSidebar;
