"use client";
import React, { useState, useEffect } from "react";
import formatCurrency from "../shared/formatCurrency";

interface Draft {
  id: string;
  image_url: string;
  description: string;
  source: string;
  price: number;
  promotion: boolean;
  link: string;
  search_id: string;
  unidade?: string;
  codigo?: string;
  formato?: string;
  tipo?: string;
  condicao?: string;
  minimo?: string;
  maximo?: string;
  crossdocking?: string;
  localizacao?: string;
}

interface DraftModalProps {
  draft: Draft;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  onSave: () => void;
  modalRef: React.RefObject<HTMLDivElement>;
}

const ProductModal: React.FC<DraftModalProps> = ({
  draft,
  onChange,
  onSave,
  modalRef,
}) => {
  const [localDraft, setLocalDraft] = useState<Draft>({
    ...draft,
    price: 0, // Inicializa como string para suportar entrada de texto
  });

  useEffect(() => {
    setLocalDraft({
      ...draft,
      price: draft.price, // Formata o preço
    });
  }, [draft]);

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const cleanValue = value.replace(/[^\d,]/g, ""); // Limpa o valor
    const floatValue = parseFloat(cleanValue.replace(",", "."));
    setLocalDraft({
      ...localDraft,
      price: isNaN(floatValue) ? 0 : floatValue,
    });
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setLocalDraft((prevDraft) => ({
      ...prevDraft,
      [name]: value,
    }));
    if (onChange) {
      onChange(event);
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
                Rascunho do produto
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
                            <label htmlFor="nome" className="form-label">
                              Nome
                            </label>
                            <input
                              id="nome"
                              name="description"
                              type="text"
                              className="form-control"
                              placeholder=""
                              value={localDraft.description}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="row mb-3">
                            <div className="col-md-4">
                              <label htmlFor="codigo" className="form-label">
                                Código (SKU)
                              </label>
                              <input
                                id="codigo"
                                name="codigo"
                                type="text"
                                className="form-control"
                                placeholder=""
                                value={localDraft.codigo || ""}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="col-md-4">
                              <label htmlFor="price" className="form-label">
                                Preço venda
                              </label>
                              <input
                                id="price"
                                name="price"
                                type="text"
                                className="form-control"
                                placeholder=""
                                value={localDraft.price.toString()}
                                onChange={handlePriceChange}
                              />
                            </div>
                            <div className="col-md-4">
                              <label htmlFor="unidade" className="form-label">
                                Unidade
                              </label>
                              <input
                                id="unidade"
                                name="unidade"
                                type="text"
                                className="form-control"
                                placeholder=""
                                value={localDraft.unidade || ""}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-md-4">
                              <label htmlFor="formato" className="form-label">
                                Formato
                              </label>
                              <select
                                id="formato"
                                name="formato"
                                className="form-select"
                                value={localDraft.formato || ""}
                                onChange={handleChange}
                              >
                                <option value="S">
                                  Simples ou com variação
                                </option>
                                <option value="E">Com composição</option>
                              </select>
                            </div>
                            <div className="col-md-4">
                              <label htmlFor="tipo" className="form-label">
                                Tipo
                              </label>
                              <select
                                id="tipo"
                                name="tipo"
                                className="form-select"
                                value={localDraft.tipo || ""}
                                onChange={handleChange}
                              >
                                <option value="P">Produto</option>
                                <option value="S">Serviço</option>
                              </select>
                            </div>
                            <div className="col-md-4">
                              <label htmlFor="condicao" className="form-label">
                                Condição
                              </label>
                              <select
                                id="condicao"
                                name="condicao"
                                className="form-select"
                                value={localDraft.condicao || ""}
                                onChange={handleChange}
                              >
                                <option value="0">Não especificado</option>
                                <option value="1">Novo</option>
                                <option value="2">Usado</option>
                                <option value="3">Recondicionado</option>
                              </select>
                            </div>
                          </div>
                          {/* Outras colunas omitidas para brevidade */}
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
