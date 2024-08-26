"use client";
import React, { useState, useEffect } from "react";

interface SearchModalProps {
  search: any;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  onSave: () => void;
  modalRef: React.RefObject<HTMLDivElement>;
}

const SearchModal: React.FC<SearchModalProps> = ({
  search,
  onChange,
  onSave,
  modalRef,
}) => {
  const [localSearch, setLocalSearch] = useState({ description: "" });

  useEffect(() => {
    if (search) {
      setLocalSearch(search);
    }
  }, [search]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setLocalSearch({
      ...localSearch,
      [e.target.name]: e.target.value,
    });
    onChange(e);
  };

  return (
    <div className="row">
      <div
        className="modal fade"
        id="modalSearch"
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
                              Descrição
                            </label>
                            <input
                              id="nome"
                              name="description"
                              type="text"
                              className="form-control"
                              placeholder=""
                              value={localSearch.description}
                              onChange={handleInputChange}
                            />
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

export default SearchModal;
