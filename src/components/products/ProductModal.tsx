"use client";
import React, { useState, useEffect } from "react";
import formatCurrency from "../shared/formatCurrency";

interface Product {
  nome: string;
  codigo: string;
  preco: number;
  tipo: string;
  situacao: string;
  formato: string;
  descricaoCurta: string;
  dataValidade: string;
  unidade: string;
  pesoLiquido: number;
  pesoBruto: number;
  volumes: number;
  itensPorCaixa: number;
  gtin: string;
  gtinEmbalagem: string;
  tipoProducao: string;
  condicao: number;
  freteGratis: boolean;
  marca: string;
  descricaoComplementar: string;
  linkExterno: string;
  observacoes: string;
  descricaoEmbalagemDiscreta: string;
  estoque: Estoque;
}

interface Estoque {
  minimo: number;
  maximo: number;
  crossdocking: number;
  localizacao: string;
}

interface ProductModalProps {
  product: Product;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  onSave: () => void;
  modalRef: React.RefObject<HTMLDivElement>;
}

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onChange,
  onSave,
  modalRef,
}) => {
  const [localProduct, setLocalProduct] = useState<Product>({
    ...product,
    preco: 0,
    estoque: product.estoque || {
      minimo: 0,
      maximo: 0,
      crossdocking: 0,
      localizacao: "",
    },
  });

  useEffect(() => {
    // Garantir que estoque seja sempre um objeto com valores definidos
    const updatedEstoque = {
      minimo: product.estoque?.minimo || 0,
      maximo: product.estoque?.maximo || 0,
      crossdocking: product.estoque?.crossdocking || 0,
      localizacao: product.estoque?.localizacao || "",
    };

    // Atualiza o estado local com o produto atualizado
    setLocalProduct((prev) => ({
      ...prev,
      ...product,
      preco: product.preco,
      estoque: updatedEstoque,
    }));
  }, [product]);

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    // Remove caracteres não numéricos, mas mantém vírgulas e pontos
    const cleanValue = value.replace(/[^\d.,]/g, "");
    // Substitui vírgulas por pontos para conversão para número
    const floatValue = parseFloat(cleanValue.replace(",", "."));

    // Atualiza o estado com o valor numérico
    setLocalProduct((prevProduct) => ({
      ...prevProduct,
      preco: isNaN(floatValue) ? prevProduct.preco : floatValue,
    }));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    console.log(`Field: ${name}, Value: ${value}`);

    if (name.startsWith("estoque.")) {
      const nestedField = name.replace("estoque.", "") as keyof Estoque;

      setLocalProduct((prevProduct) => {
        const updatedEstoque = {
          ...prevProduct.estoque,
          [nestedField]: isNaN(Number(value)) ? value : Number(value), // Convert to number if possible
        };

        product.estoque.minimo = updatedEstoque.minimo;
        product.estoque.maximo = updatedEstoque.maximo;
        product.estoque.crossdocking = updatedEstoque.crossdocking;
        product.estoque.localizacao = updatedEstoque.localizacao;

        return {
          ...prevProduct,
          estoque: updatedEstoque,
        };
      });
    } else {
      setLocalProduct((prevProduct) => {
        console.log(`Updated Field: ${name}, Value: ${value}`);

        return {
          ...prevProduct,
          [name]: value,
        };
      });
    }
  };

  return (
    <div className="row">
      <div
        className="modal fade"
        id="modalProduct"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        ref={modalRef}
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Cadastrar novo produto
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="col-md-12 mb-3">
                <div className="card h-100 card-none-box-shadow">
                  <div className="card-body">
                    <h5 className="card-title">Dados básicos</h5>

                    <form className="row g-3">
                      <div className="tab-base">
                        <div className="tab-content">
                          <div className="col-12 mb-3">
                            <label
                              htmlFor="_dm-inputAddress"
                              className="form-label"
                            >
                              Nome
                            </label>
                            <input
                              id="nome"
                              name="nome"
                              type="text"
                              className="form-control"
                              placeholder=""
                              value={localProduct.nome}
                              onChange={onChange}
                            />
                          </div>
                          <div className="row mb-3">
                            <div className="col-md-4">
                              <label
                                htmlFor="_dm-inputAddress2"
                                className="form-label"
                              >
                                Código (SKU)
                              </label>
                              <input
                                id="codigo"
                                name="codigo"
                                type="text"
                                className="form-control"
                                placeholder=""
                                value={localProduct.codigo}
                                onChange={onChange}
                              />
                            </div>
                            <div className="col-md-4">
                              <label
                                htmlFor="_dm-inputAddress2"
                                className="form-label"
                              >
                                Preço venda
                              </label>
                              <input
                                id="preco"
                                name="preco"
                                type="text"
                                className="form-control"
                                placeholder=""
                                value={localProduct.preco}
                                onChange={handlePriceChange}
                              />
                            </div>
                            <div className="col-md-4">
                              <label
                                htmlFor="_dm-inputAddress2"
                                className="form-label"
                              >
                                Unidade
                              </label>
                              <input
                                id="unidade"
                                name="unidade"
                                type="text"
                                className="form-control"
                                placeholder=""
                                value={localProduct.unidade}
                                onChange={handlePriceChange}
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-md-4">
                              <label
                                htmlFor="inputState"
                                className="form-label"
                              >
                                Formato
                              </label>
                              <select
                                id="formato"
                                name="formato"
                                className="form-select"
                                value={localProduct.formato}
                                onChange={onChange}
                              >
                                <option value="S">
                                  Simples ou com variação
                                </option>
                                <option value="E">Com composição</option>
                              </select>
                            </div>
                            <div className="col-md-4">
                              <label
                                htmlFor="inputState"
                                className="form-label"
                              >
                                Tipo
                              </label>
                              <select
                                id="tipo"
                                name="tipo"
                                className="form-select"
                                value={localProduct.tipo}
                                onChange={onChange}
                              >
                                <option value="P">Produto</option>
                                <option value="S">Serviço</option>
                              </select>
                            </div>
                            <div className="col-md-4">
                              <label
                                htmlFor="inputState"
                                className="form-label"
                              >
                                Condição
                              </label>
                              <select
                                id="condicao"
                                name="condicao"
                                className="form-select"
                                value={localProduct.condicao}
                                onChange={onChange}
                              >
                                <option value="0">Não especificado</option>
                                <option value="1">Novo</option>
                                <option value="2">Usado</option>
                                <option value="3">Recondicionado</option>
                              </select>
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-md-4">
                              <label
                                htmlFor="inputState"
                                className="form-label"
                              >
                                Mínimo
                              </label>
                              <input
                                id="estoque.minimo"
                                name="estoque.minimo"
                                type="text"
                                className="form-control"
                                placeholder=""
                                value={localProduct.estoque.minimo}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="col-md-4">
                              <label
                                htmlFor="inputState"
                                className="form-label"
                              >
                                Máximo
                              </label>
                              <input
                                id="estoque.maximo"
                                name="estoque.maximo"
                                type="text"
                                className="form-control"
                                placeholder=""
                                value={localProduct.estoque.maximo}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="col-md-4">
                              <label
                                htmlFor="inputState"
                                className="form-label"
                              >
                                Crossdocking
                              </label>
                              <input
                                id="estoque.crossdocking"
                                name="estoque.crossdocking"
                                type="text"
                                className="form-control"
                                placeholder=""
                                value={localProduct.estoque.crossdocking}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-md-4">
                              <label
                                htmlFor="inputState"
                                className="form-label"
                              >
                                Localização
                              </label>
                              <input
                                id="estoque.localizacao"
                                name="estoque.localizacao"
                                type="text"
                                className="form-control"
                                placeholder=""
                                value={localProduct.estoque.localizacao}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="col-md-4">
                              <label
                                htmlFor="inputState"
                                className="form-label"
                              >
                                Preço de custo
                              </label>
                              <input
                                id="preco_custo"
                                name="preco_custo"
                                type="text"
                                className="form-control"
                                placeholder=""
                                onChange={onChange}
                              />
                            </div>
                            <div className="col-md-4">
                              <label
                                htmlFor="inputState"
                                className="form-label"
                              >
                                Preço de venda
                              </label>
                              <input
                                id="preco_venda"
                                name="preco_venda"
                                type="text"
                                className="form-control"
                                placeholder=""
                                onChange={onChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Fechar
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={onSave}
                        >
                          Salvar
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
