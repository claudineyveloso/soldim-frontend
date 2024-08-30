"use client";
import React, { useState, useEffect } from "react";
import formatCurrency from "../shared/formatCurrency";
import MoneyInput from "../shared/MoneyInput";

interface TriageModalProps {
  triage: any;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  onSave: () => void;
  modalRef: React.RefObject<HTMLDivElement>;
}

const TriageModal: React.FC<TriageModalProps> = ({
  triage,
  onChange,
  onSave,
  modalRef,
}) => {
  const [localTriage, setLocalTriage] = useState({ ...triage, preco: "" });
  const [amount, setAmount] = useState<number>(0);
  useEffect(() => {
    setLocalTriage({ ...triage });
  }, [triage]);

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const cleanValue = value.replace(/[^\d,]/g, "");
    const floatValue = Number.parseFloat(cleanValue.replace(",", "."));
    setLocalTriage({
      ...localTriage,
    });
  };

  const handleAmountChange = (value: number) => {
    setAmount(value);
    setLocalTriage({
      ...localTriage,
      unitary_value: value,
    });
    console.log(localTriage);
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
                              value={localTriage.description}
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
                                value={localTriage.sku_sap}
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
                              <MoneyInput
                                id="unitary_value"
                                value={localTriage.unitary_value}
                                className="form-control"
                                onChange={handleAmountChange}
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
                                value={localTriage.unidade}
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
                                value={localTriage.formato}
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
                                value={localTriage.tipo}
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
                                value={localTriage.condicao}
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
                                id="codigo"
                                name="codigo"
                                type="text"
                                className="form-control"
                                placeholder=""
                                value={localTriage.minimo}
                                onChange={onChange}
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
                                id="codigo"
                                name="codigo"
                                type="text"
                                className="form-control"
                                placeholder=""
                                value={localTriage.minimo}
                                onChange={onChange}
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
                                id="codigo"
                                name="codigo"
                                type="text"
                                className="form-control"
                                placeholder=""
                                value={localTriage.crossdocking}
                                onChange={onChange}
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
                                id="codigo"
                                name="codigo"
                                type="text"
                                className="form-control"
                                placeholder=""
                                value={localTriage.localizacao}
                                onChange={onChange}
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
                                id="codigo"
                                name="codigo"
                                type="text"
                                className="form-control"
                                placeholder=""
                                value={localTriage.minimo}
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
                                id="codigo"
                                name="codigo"
                                type="text"
                                className="form-control"
                                placeholder=""
                                value={localTriage.crossdocking}
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

export default TriageModal;
