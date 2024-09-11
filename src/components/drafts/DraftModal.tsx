"use client";
import { useState, useEffect } from "react";
import MoneyInput from "../shared/MoneyInput";

interface Draft {
  description: string;
  codigo: string;
  price: string;
  precoCusto: number;
  precoCompra: number;
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
  saldoFisicoTotal: number;
  saldoVirtualTotal: number;
  saldoFisico: number;
  saldoVirtual: number;
}

interface Estoque {
  minimo: number;
  maximo: number;
  crossdocking: number;
  localizacao: string;
}

interface stockControl {
  tipo: string;
  quantidade: number;
  preco_custo: number;
  preco_venda: number;
  observacao: string;
}

interface Deposit {
  id: string;
  descricao: string;
}

interface DraftModalProps {
  draft: Draft;
  deposits: Deposit[];

  defaultDeposit: number | null;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  onSave: () => void;
  modalRef: React.RefObject<HTMLDivElement>;
}

const ProductModal: React.FC<DraftModalProps> = ({
  draft,
  deposits,
  defaultDeposit,
  onChange,
  onSave,
  modalRef,
}) => {
  const [localDraft, setLocalDraft] = useState<Draft>({
    ...draft,
    price: "",
    estoque: draft.estoque || {
      minimo: 0,
      maximo: 0,
      crossdocking: 0,
      localizacao: "",
    },
  });
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    // Garantir que estoque seja sempre um objeto com valores definidos
    const updatedEstoque = {
      minimo: draft.estoque?.minimo || 0,
      maximo: draft.estoque?.maximo || 0,
      crossdocking: draft.estoque?.crossdocking || 0,
      localizacao: draft.estoque?.localizacao || "",
    };

    // Atualiza o estado local com o produto atualizado
    setLocalDraft((prev) => ({
      ...prev,
      ...draft,
      price: draft.price,
      estoque: updatedEstoque,
    }));
  }, [draft]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    console.log(`Field: ${name}, Value: ${value}`);

    if (name.startsWith("estoque.")) {
      const nestedField = name.replace("estoque.", "") as keyof Estoque;

      setLocalDraft((prevProduct) => {
        const updatedEstoque = {
          ...prevProduct.estoque,
          [nestedField]: Number.isNaN(Number(value)) ? value : Number(value), // Convert to number if possible
        };

        draft.estoque.minimo = updatedEstoque.minimo;
        draft.estoque.maximo = updatedEstoque.maximo;
        draft.estoque.crossdocking = updatedEstoque.crossdocking;
        draft.estoque.localizacao = updatedEstoque.localizacao;

        return {
          ...prevProduct,
          estoque: updatedEstoque,
        };
      });
    } else {
      setLocalDraft((prevProduct) => {
        console.log(`Updated Field: ${name}, Value: ${value}`);

        return {
          ...prevProduct,
          [name]: value,
        };
      });
    }
  };

  useEffect(() => {
    console.log(`Updated Amount: ${localDraft.price}`);
  }, [localDraft.price]);

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
          <div className="modal-content bg-modal">
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
              <div className="content__boxed">
                <div className="row">
                  <div className="tab-base">
                    <ul className="nav nav-tabs" role="tablist">
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link active"
                          data-bs-toggle="tab"
                          data-bs-target="#_dm-tabsHome"
                          type="button"
                          role="tab"
                          aria-controls="home"
                          aria-selected="true"
                        >
                          Caracteristica
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          data-bs-toggle="tab"
                          data-bs-target="#_dm-tabsProfile"
                          type="button"
                          role="tab"
                          aria-controls="profile"
                          aria-selected="false"
                        >
                          Estoque
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          data-bs-toggle="tab"
                          data-bs-target="#_dm-tabsContact"
                          type="button"
                          role="tab"
                          aria-controls="contact"
                          aria-selected="false"
                        >
                          Controle de Estoque
                        </button>
                      </li>
                    </ul>
                    <form className="row1 g-322">
                      <div className="tab-content">
                        <div
                          id="_dm-tabsHome"
                          className="tab-pane fade show active"
                          role="tabpanel"
                          aria-labelledby="home-tab"
                        >
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
                                  id="description"
                                  className="form-control"
                                  placeholder=""
                                  type="text"
                                  value={localDraft.description}
                                  name="description"
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
                                    className="form-control"
                                    placeholder=""
                                    type="text"
                                    value={localDraft.codigo}
                                    name="codigo"
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
                                    id="price"
                                    className="form-control"
                                    placeholder=""
                                    type="text"
                                    value={localDraft.price}
                                    name="price"
                                    onChange={onChange}
                                  />
                                </div>
                                <div className="col-md-4">
                                  <label
                                    htmlFor="_dm-inputAddress2"
                                    className="form-label"
                                  >
                                    Preço custo
                                  </label>
                                  <input
                                    id="precoCusto"
                                    className="form-control"
                                    placeholder=""
                                    type="text"
                                    value={localDraft.precoCusto}
                                    name="precoCusto"
                                    onChange={onChange}
                                  />
                                </div>
                              </div>
                              <div className="row mb-3">
                                <div className="col-md-4">
                                  <label
                                    htmlFor="_dm-inputAddress2"
                                    className="form-label"
                                  >
                                    Unidade
                                  </label>
                                  <input
                                    id="unidade"
                                    className="form-control"
                                    placeholder=""
                                    type="text"
                                    value={localDraft.unidade}
                                    name="unidade"
                                    onChange={onChange}
                                  />
                                </div>
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
                                    value={localDraft.tipo}
                                    onChange={onChange}
                                  >
                                    <option value="P">Produto</option>
                                    <option value="S">Serviço</option>
                                  </select>
                                </div>
                              </div>
                              <div className="row mb-3">
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
                                    value={localDraft.condicao}
                                    onChange={onChange}
                                  >
                                    <option value="0">Não especificado</option>
                                    <option value="1">Novo</option>
                                    <option value="2">Usado</option>
                                    <option value="3">Recondicionado</option>
                                  </select>
                                </div>
                                <div className="col-md-4">
                                  <label
                                    htmlFor="inputState"
                                    className="form-label"
                                  >
                                    Volumes
                                  </label>
                                  <input
                                    id="volumes"
                                    name="volumes"
                                    type="text"
                                    className="form-control"
                                    placeholder=""
                                    value={localDraft.volumes}
                                    onChange={handleInputChange}
                                  />
                                </div>
                                <div className="col-md-4">
                                  <label
                                    htmlFor="inputState"
                                    className="form-label"
                                  >
                                    Gtin
                                  </label>
                                  <input
                                    id="gtin"
                                    name="gtin"
                                    type="text"
                                    className="form-control"
                                    placeholder=""
                                    value={localDraft.gtin}
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
                                    Gtin embalagem
                                  </label>
                                  <input
                                    id="gtinEmbalagem"
                                    name="gtinEmbalagem"
                                    type="text"
                                    className="form-control"
                                    placeholder=""
                                    value={localDraft.gtinEmbalagem}
                                    onChange={onChange}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          id="_dm-tabsProfile"
                          className="tab-pane fade"
                          role="tabpanel"
                          aria-labelledby="profile-tab"
                        >
                          <div className="tab-base">
                            <div className="tab-content">
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
                                    value={localDraft.estoque.minimo}
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
                                    value={localDraft.estoque.maximo}
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
                                    value={localDraft.estoque.crossdocking}
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
                                    value={localDraft.estoque.localizacao}
                                    onChange={handleInputChange}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          id="_dm-tabsContact"
                          className="tab-pane fade"
                          role="tabpanel"
                          aria-labelledby="contact-tab"
                        >
                          <div className="tab-base">
                            <div className="tab-content">
                              <div className="row mb-3">
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
                                    value={localDraft.tipo}
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
                                    Quantidade
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
                                    Preço de compra
                                  </label>
                                  <input
                                    id="precoCompra"
                                    className="form-control"
                                    placeholder=""
                                    type="text"
                                    value={localDraft.precoCompra}
                                    name="price"
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
                                    Preço de custo
                                  </label>
                                  <input
                                    id="precoCusto"
                                    className="form-control"
                                    placeholder=""
                                    type="text"
                                    value={localDraft.precoCusto}
                                    name="price"
                                    onChange={onChange}
                                  />
                                </div>
                                <div className="col-md-4">
                                  <label
                                    htmlFor="inputState"
                                    className="form-label"
                                  >
                                    Depósito
                                  </label>

                                  <select
                                    id="deposit"
                                    name="deposit"
                                    value={defaultDeposit ?? ""}
                                    className="form-select"
                                    onChange={onChange}
                                  >
                                    {deposits.map((deposit) => (
                                      <option
                                        key={deposit.id}
                                        value={deposit.id}
                                      >
                                        {deposit.descricao}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                              <div className="row mb-3">
                                <div className="col-md-12">
                                  <label
                                    htmlFor="_dm-inputAddress2"
                                    className="form-label"
                                  >
                                    Observação
                                  </label>
                                  <textarea
                                    id="obervacoes"
                                    name="observacoes"
                                    className="form-control"
                                    rows={4}
                                    cols={50}
                                    value={localDraft.observacoes}
                                    onChange={onChange}
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
