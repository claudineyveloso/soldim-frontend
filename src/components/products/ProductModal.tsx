import React, { useState, useEffect } from "react";

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
        <div className="modal-dialog">
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
              ></button>
            </div>
            <div className="modal-body">
              <div className="col-md-12 mb-3">
                <div className="card h-100 card-none-box-shadow">
                  <div className="card-body">
                    <h5 className="card-title">Dados básicos</h5>

                    <form className="row g-3">
                      <div className="col-12">
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
                          value={product.nome}
                          onChange={onChange}
                        />
                      </div>

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
                          value={product.codigo}
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
                          value={product.preco}
                          onChange={onChange}
                        />
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="_dm-inputCity" className="form-label">
                          Unidade
                        </label>
                        <input
                          id="unidade"
                          name="unidade"
                          type="text"
                          className="form-control"
                          value={product.unidade}
                          onChange={onChange}
                        />
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="inputState" className="form-label">
                          Formato
                        </label>
                        <select
                          id="formato"
                          name="formato"
                          className="form-select"
                          value={product.formato}
                          onChange={onChange}
                        >
                          <option value="S">Simples ou com variação</option>
                          <option value="E">Com composição</option>
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="inputState" className="form-label">
                          Tipo
                        </label>
                        <select
                          id="tipo"
                          name="tipo"
                          className="form-select"
                          value={product.tipo}
                          onChange={onChange}
                        >
                          <option value="P">Produto</option>
                          <option value="S">Serviço</option>
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="inputState" className="form-label">
                          Condição
                        </label>
                        <select
                          id="condicao"
                          name="condicao"
                          className="form-select"
                          value={product.condicao}
                          onChange={onChange}
                        >
                          <option value="0">Não especificado</option>
                          <option value="1">Novo</option>
                          <option value="2">Usado</option>
                          <option value="3">Recondicionado</option>
                        </select>
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
