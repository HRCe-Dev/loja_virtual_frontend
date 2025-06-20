'use client';
import { useState } from "react";
import { ShoppingCart, Truck, Repeat, Star } from "lucide-react";
import { BtnListaDesejo } from "@/componentes/Buttons/ButtonListaDesejo";
import ProdutoCard from "@/componentes/ProdutoCard";
import SeccaoMarker from "@/app/(home)/SeccaoMarker";
import ProductGallery from "./GaleriaProdutos";
import ProductTabs from "./ProductTabs";
import { ProdutoListaLg } from "@/componentes/ProdutoLista";

const produtoFake = {
  id: 1,
  nome: "Fone de Ouvido Bluetooth",
  preco: 299.99,
  imagem_url: "https://via.placeholder.com/600x600?text=Produto",
  estoque: 12,
  descricao: "Este é um fone de ouvido bluetooth com cancelamento de ruído e bateria de longa duração.",
  categoria: { nome: "Eletrônicos" },
  subcategoria: { nome: "Áudio" },
};

const produtosSemelhantesFake = Array(4).fill(null).map((_, i) => ({
  id: (i + 2).toString(),
  nome: `Produto Similiar ${i + 1}`,
  preco: 199.99,
  imagem_url: "https://via.placeholder.com/400x400?text=Similar+" + (i + 1),
  estoque: 5,
  categoria: { nome: "Eletrônicos" },
  subcategoria: { nome: "Áudio" },
}));

const coresDisponiveis = ["red", "black"];
const tamanhosDisponiveis = ["XS", "S", "M", "L", "XL"];

const ProdutoPage = () => {
  const produto = produtoFake;
  const ProdutosSemelhantes = produtosSemelhantesFake;

  const [corSelecionada, setCorSelecionada] = useState("red");
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState("M");
  const [quantidade, setQuantidade] = useState(1);

  const aumentar = () => {
    if (quantidade < produto.estoque) setQuantidade(q => q + 1);
  };

  const diminuir = () => {
    if (quantidade > 1) setQuantidade(q => q - 1);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-10 mt-6 mb-20">
      <p className="text-gray-600 text-sm mb-4">
        {produto.categoria.nome} / {produto.subcategoria.nome}
      </p>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-1/2">
          <ProductGallery
            nome={produto.nome}
            imagens={Array(4).fill(produto.imagem_url)}
          />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col gap-5">
          <h1 className="text-3xl font-bold">{produto.nome}</h1>

          {/* Avaliações */}
          <div className="flex items-center gap-2 text-orange-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} fill="orange" strokeWidth={0} className="w-4 h-4" />
            ))}
            <span className="text-sm font-semibold text-black">
              4.7 <span className="text-gray-400 font-normal">(21,671 Avaliações)</span>
            </span>
          </div>

          {/* Preço */}
          <div className="flex items-center gap-3">
            <p className="text-2xl font-bold text-gray-900">${produto.preco}</p>
            <p className="line-through text-gray-400">$1999.00</p>
            <span className="text-sm font-medium text-white bg-orange-500 px-2 py-1 rounded">
              21% OFF
            </span>
            <BtnListaDesejo produto_id={produto.id.toString()} tipo={3} />
          </div>

          {/* Cor */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold">Cor:</span>
            {coresDisponiveis.map((cor) => (
              <button
                key={cor}
                className={`w-5 h-5 rounded-full border-2 ${
                  corSelecionada === cor ? 'border-black' : 'border-gray-300'
                }`}
                style={{ backgroundColor: cor }}
                onClick={() => setCorSelecionada(cor)}
              />
            ))}
          </div>

          {/* Tamanhos */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">Tamanho:</span>
            {tamanhosDisponiveis.map((t) => (
              <button
                key={t}
                onClick={() => setTamanhoSelecionado(t)}
                className={`border px-3 py-1 rounded text-sm font-medium ${
                  tamanhoSelecionado === t
                    ? "bg-orange-500 text-white border-orange-500"
                    : "text-gray-700"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Quantidade */}
          <div className="flex items-center gap-3">
            <div className="flex border rounded overflow-hidden">
              <button className="px-3 text-xl text-gray-700" onClick={diminuir}>−</button>
              <span className="px-4 py-1 border-l border-r text-sm">{quantidade}</span>
              <button className="px-3 text-xl text-white bg-orange-500" onClick={aumentar}>+</button>
            </div>
            <span className="text-sm text-gray-600">{produto.estoque} disponíveis</span>
          </div>

          {/* Botões */}
          <div className="flex flex-col gap-3 px-12">
            <button className="w-full bg-orange-500 text-white font-bold py-3 rounded flex items-center justify-center gap-2 text-sm tracking-wide">
              ADICIONAR AO <ShoppingCart className="w-4 h-4" />
            </button>
            <button className="w-full border border-orange-500 text-orange-500 font-bold py-3 rounded text-sm tracking-wide">
              COMPRAR AGORA
            </button>
          </div>

          {/* Info adicional */}
          <div className="flex gap-8 mt-4 text-sm text-gray-800 justify-center">
            <div className="flex items-center gap-2 text-lg">
              <Truck className="w-8 h-8" /> Entrega Rápida
            </div>
            <div className="flex items-center gap-2 text-lg">
              <Repeat className="w-8 h-8" /> Troca e Devolução
            </div>
          </div>
        </div>
      </div>

      <ProductTabs descricao={produto.descricao} />

      <div className="mt-16">
        <SeccaoMarker>Itens similares</SeccaoMarker>
        <ProdutoListaLg>
          {ProdutosSemelhantes.map((p) => (
            <ProdutoCard key={p.id} produto={p} />
          ))}
        </ProdutoListaLg>
      </div>
    </div>
  );
};

export default ProdutoPage;
