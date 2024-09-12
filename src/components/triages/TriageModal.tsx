"use client";
import { useState, useEffect } from "react";

interface Triage {
  id: string;
  type: string;
  grid: string;
  sku_sap: number;
  sku_wms: string;
  description: string;
  cust_id: number;
  seller: string;
  quantity_supplied: number;
  final_quantity: number;
  unitary_value: number;
  total_value_offered: number;
  final_total_value: number;
  category: string;
  sub_category: string;
  sent_to_batch: boolean;
  sent_to_bling: boolean;
  defect: boolean;
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

interface TriageModalProps {
  triage: Triage;
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

const TriageModal: React.FC<TriageModalProps> = ({
  triage,
  deposits,
  defaultDeposit,
  onChange,
  onSave,
  modalRef,
}) => {
  const [localTriage, setLocalTriage] = useState<Triage>({
    ...triage,
    unitary_value: 0,
    estoque: triage.estoque || {
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
      minimo: triage.estoque?.minimo || 0,
      maximo: triage.estoque?.maximo || 0,
      crossdocking: triage.estoque?.crossdocking || 0,
      localizacao: triage.estoque?.localizacao || "",
    };

    // Atualiza o estado local com o produto atualizado
    setLocalTriage((prev) => ({
      ...prev,
      ...triage,
      preco: triage.unitary_value,
      estoque: updatedEstoque,
    }));
  }, [triage]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    console.log(`Field: ${name}, Value: ${value}`);

    if (name.startsWith("estoque.")) {
      const nestedField = name.replace("estoque.", "") as keyof Estoque;

      setLocalTriage((prevTriage) => {
        const updatedEstoque = {
          ...prevTriage.estoque,
          [nestedField]: Number.isNaN(Number(value)) ? value : Number(value), // Convert to number if possible
        };

        triage.estoque.minimo = updatedEstoque.minimo;
        triage.estoque.maximo = updatedEstoque.maximo;
        triage.estoque.crossdocking = updatedEstoque.crossdocking;
        triage.estoque.localizacao = updatedEstoque.localizacao;

        return {
          ...prevTriage,
          estoque: updatedEstoque,
        };
      });
    } else {
      setLocalTriage((prevTriage) => {
        console.log(`Updated Field: ${name}, Value: ${value}`);

        return {
          ...prevTriage,
          [name]: value,
        };
      });
    }
  };

  const handleAmountChange = (value: number) => {
    setAmount(value);
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
                                  id="nome"
                                  className="form-control"
                                  placeholder=""
                                  type="text"
                                  value={localTriage.description}
                                  name="nome"
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
                                    value={localTriage.sku_sap}
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
                                    id="preco"
                                    className="form-control"
                                    placeholder=""
                                    type="text"
                                    value={localTriage.unitary_value}
                                    name="preco"
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
                                    value={localTriage.precoCusto}
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
                                    value={localTriage.unidade}
                                    name="unidade"
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
                                    value={localTriage.tipo}
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
                                    value={localTriage.condicao}
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
                                    value={localTriage.volumes}
                                    onChange={onChange}
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
                                    value={localTriage.gtin}
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
                                    value={localTriage.gtinEmbalagem}
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
                                    value={localTriage.estoque.minimo}
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
                                    value={localTriage.estoque.maximo}
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
                                    value={localTriage.estoque.crossdocking}
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
                                    value={localTriage.estoque.localizacao}
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
                                    value={localTriage.precoCompra}
                                    name="precoCompra"
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
                                    value={localTriage.precoCusto}
                                    name="precoCusto"
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
                                    value={localTriage.observacoes}
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

export default TriageModal;
