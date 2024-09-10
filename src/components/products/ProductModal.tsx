"use client";
import { useState, useEffect } from "react";
import MoneyInput from "../shared/MoneyInput";

interface Product {
  nome: string;
  codigo: string;
  preco: number;
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

interface ProductModalProps {
  product: Product;
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

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  deposits,
  defaultDeposit,
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
  const [amount, setAmount] = useState<number>(0);

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
    const floatValue = Number.parseFloat(cleanValue.replace(",", "."));

    // Atualiza o estado com o valor numérico
    setLocalProduct((prevProduct) => ({
      ...prevProduct,
      preco: Number.isNaN(floatValue) ? prevProduct.preco : floatValue,
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
          [nestedField]: Number.isNaN(Number(value)) ? value : Number(value), // Convert to number if possible
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
                                  value={localProduct.nome}
                                  name="nome"
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
                                    value={localProduct.codigo}
                                    name="codigo"
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
                                    id="preco"
                                    value={localProduct.preco}
                                    className="form-control"
                                    onChange={handleAmountChange}
                                  />
                                </div>
                                <div className="col-md-4">
                                  <label
                                    htmlFor="_dm-inputAddress2"
                                    className="form-label"
                                  >
                                    Preço custo
                                  </label>
                                  <MoneyInput
                                    id="precoCusto"
                                    value={localProduct.precoCusto}
                                    className="form-control"
                                    onChange={handleAmountChange}
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
                                    value={localProduct.unidade}
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
                                    value={localProduct.tipo}
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
                                    value={localProduct.condicao}
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
                                    value={localProduct.volumes}
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
                                    value={localProduct.gtin}
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
                                    id="gtin"
                                    name="gtin"
                                    type="text"
                                    className="form-control"
                                    placeholder=""
                                    value={localProduct.gtinEmbalagem}
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
                                  <MoneyInput
                                    id="precoCompra"
                                    value={localProduct.precoCompra}
                                    className="form-control"
                                    onChange={handleAmountChange}
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
                                  <MoneyInput
                                    id="precoVenda"
                                    value={localProduct.precoCusto}
                                    className="form-control"
                                    onChange={handleAmountChange}
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
                                    value={localProduct.observacoes}
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
