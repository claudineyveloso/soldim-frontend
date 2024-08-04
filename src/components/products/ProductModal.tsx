"use client";
import React, { useState, useEffect } from "react";
import formatCurrency from "../shared/formatCurrency";

interface ProductModalProps {
  product: any;
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
  const [localProduct, setLocalProduct] = useState({ ...product, preco: "" });

  useEffect(() => {
    setLocalProduct({ ...product, preco: formatCurrency(product.preco) });
  }, [product]);

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    // Remove tudo que não é número ou vírgula (para decimais)
    const cleanValue = value.replace(/[^\d,]/g, "");
    // Substitui vírgulas por pontos para converter para float
    const floatValue = parseFloat(cleanValue.replace(",", "."));
    // Define o estado do produto com o valor formatado
    setLocalProduct({
      ...localProduct,
      preco: isNaN(floatValue) ? value : formatCurrency(floatValue),
    });
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
                        <ul
                          className="nav nav-underline nav-component border-bottom"
                          role="tablist"
                        >
                          <li className="nav-item" role="presentation">
                            <button
                              className="nav-link px-3 active"
                              data-bs-toggle="tab"
                              data-bs-target="#_dm-coTabsBaseHome"
                              type="button"
                              role="tab"
                              aria-controls="home"
                              aria-selected="true"
                            >
                              Básicos
                            </button>
                          </li>
                          <li className="nav-item" role="presentation">
                            <button
                              className="nav-link px-3"
                              data-bs-toggle="tab"
                              data-bs-target="#_dm-coTabsBaseProfile"
                              type="button"
                              role="tab"
                              aria-controls="profile"
                              aria-selected="false"
                              tabIndex={-1}
                            >
                              Estoque
                            </button>
                          </li>
                          <li className="nav-item" role="presentation">
                            <button
                              className="nav-link px-3"
                              data-bs-toggle="tab"
                              data-bs-target="#_dm-coTabsBaseContact"
                              type="button"
                              role="tab"
                              aria-controls="contact"
                              aria-selected="false"
                              tabIndex={-1}
                            >
                              Vendas
                            </button>
                          </li>
                        </ul>
                        <div className="tab-content">
                          <div
                            id="_dm-coTabsBaseHome"
                            className="tab-pane fade active show"
                            role="tabpanel"
                            aria-labelledby="home-tab"
                          >
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
                              <div className="col-md-6">
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
                              <div className="col-md-6">
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
                            </div>
                            <div className="row mb-3">
                              <div className="col-md-6">
                                <label
                                  htmlFor="_dm-inputCity"
                                  className="form-label"
                                >
                                  Unidade
                                </label>
                                <input
                                  id="unidade"
                                  name="unidade"
                                  type="text"
                                  className="form-control"
                                  value={localProduct.unidade}
                                  onChange={onChange}
                                />
                              </div>
                              <div className="col-md-6">
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
                            </div>
                            <div className="row mb-3">
                              <div className="col-md-6">
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
                              <div className="col-md-6">
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
                          </div>
                          <div
                            id="_dm-coTabsBaseProfile"
                            className="tab-pane fade active show"
                            role="tabpanel"
                            aria-labelledby="profile-tab"
                          >
                            <div className="row mb-3">
                              <div className="col-md-6">
                                <label
                                  htmlFor="_dm-inputAddress2"
                                  className="form-label"
                                >
                                  Mínimo
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
                              <div className="col-md-6">
                                <label
                                  htmlFor="_dm-inputAddress2"
                                  className="form-label"
                                >
                                  Máximo
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
                            </div>
                            <div className="row mb-3">
                              <div className="col-md-6">
                                <label
                                  htmlFor="_dm-inputAddress2"
                                  className="form-label"
                                >
                                  crossdocking
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
                              <div className="col-md-6">
                                <label
                                  htmlFor="_dm-inputAddress2"
                                  className="form-label"
                                >
                                  localizacao
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
                            </div>
                          </div>
                          <div
                            id="_dm-coTabsBaseContact"
                            className="tab-pane fade"
                            role="tabpanel"
                            aria-labelledby="contact-tab"
                          >
                            <div className="row mb-3">
                              <div className="col-md-6">
                                <label
                                  htmlFor="_dm-inputAddress2"
                                  className="form-label"
                                >
                                  Preço de custo:
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
                              <div className="col-md-6">
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
