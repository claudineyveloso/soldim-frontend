"use client";
import React, { useState, useEffect } from "react";

interface UserModalProps {
  user: any;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  onSave: () => void;
  modalRef: React.RefObject<HTMLDivElement>;
}

const UserModal: React.FC<UserModalProps> = ({
  user,
  onChange,
  onFocus,
  onSave,
  modalRef,
}) => {
  return (
    <div className="row">
      <div
        className="modal fade"
        id="modalUser"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        ref={modalRef}
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Cadastrar novo usuário
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
                            <label htmlFor="email" className="form-label">
                              Email
                            </label>
                            <input
                              id="email"
                              name="email"
                              type="text"
                              className="form-control"
                              value={user.email}
                              onChange={onChange}
                              onFocus={onFocus}
                            />
                          </div>
                          <div className="row mb-3">
                            <div className="col-md-6">
                              <label htmlFor="password" className="form-label">
                                Senha
                              </label>
                              <input
                                id="password"
                                name="password"
                                type="password"
                                className="form-control"
                                value={user.password}
                                onChange={onChange}
                              />
                            </div>
                            <div className="col-md-6">
                              <label htmlFor="user_type" className="form-label">
                                Tipo do usuário
                              </label>
                              <select
                                id="user_type"
                                name="user_type"
                                className="form-select"
                                value={user.user_type}
                                onChange={onChange}
                              >
                                <option value="S">Super Admin</option>
                                <option value="A">Admin</option>
                                <option value="C">Colaborador</option>
                              </select>
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

export default UserModal;
