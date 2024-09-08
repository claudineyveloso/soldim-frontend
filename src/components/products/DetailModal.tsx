import { useState, useEffect } from "react";
import formatCurrency from "../shared/formatCurrency";

interface DetailModalProps {
  product: any;
  depositProduct: any;
  modalRef: React.RefObject<HTMLDivElement>;
}

interface Condition {
  condicao: 0 | 1 | 2 | 3;
}

const DetailModal: React.FC<DetailModalProps> = ({
  product,
  depositProduct,
  modalRef,
}) => {
  const [localProduct, setLocalProduct] = useState({
    ...product,
    preco: "",
    preco_venda: "",
    preco_custo: "",
  });

  useEffect(() => {
    setLocalProduct({
      ...product,
      preco: formatCurrency(product.preco),
      preco_venda: formatCurrency(product.preco_venda),
      preco_custo: formatCurrency(product.preco_custo),
    });
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

  const condicaoMap: Record<Condition["condicao"], string> = {
    0: "Não especificado",
    1: "Novo",
    2: "Usado",
    3: "Recondicionado",
  };

  const condicaoLabel =
    condicaoMap[localProduct.condicao as Condition["condicao"]] ||
    "Desconhecido";

  return (
    <div className="row">
      <div
        className="modal fade"
        id="modalDetailProduct"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        ref={modalRef}
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Detalhes do produto
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
                    <div className="tab-content">
                      <div
                        id="_dm-coTabsBaseDetail"
                        className="tab-pane fade active show"
                        role="tabpanel"
                        aria-labelledby="home-tab"
                      >
                        <div className="row mb-3">
                          <div className="col-md-4">
                            <p className="mb-0">
                              <span className="d-inline h6">ID: </span>
                              {localProduct.id}
                            </p>
                          </div>
                          <div className="col-md-8">
                            <p className="mb-0">
                              <span className="d-inline h6">Situação: </span>
                              {localProduct.situacao === "A"
                                ? " Ativo"
                                : " Desativado"}
                            </p>
                          </div>
                        </div>
                        <div className="col-12 mb-3">
                          <p className="mb-0">
                            <span className="d-inline h6">Nome: </span>
                            {localProduct.nome}
                          </p>
                        </div>

                        <div className="row mb-3">
                          <div className="col-md-3">
                            <p className="mb-0">
                              <span className="d-inline h6">
                                Código (SKU):{" "}
                              </span>
                              {localProduct.codigo}
                            </p>
                          </div>
                          <div className="col-md-3">
                            <p className="mb-0">
                              <span className="d-inline h6">Preço: </span>
                              {localProduct.preco}
                            </p>
                          </div>
                          <div className="col-md-2">
                            <p className="mb-0">
                              <span className="d-inline h6">Unidade: </span>
                              {localProduct.unidade}
                            </p>
                          </div>
                          <div className="col-md-4">
                            <p className="mb-0">
                              <span className="d-inline h6">Formato: </span>
                              {localProduct.formato === "S" && "Simples"}
                              {localProduct.formato === "V" && "Com variações"}
                              {localProduct.formato === "E" && "Com composição"}
                            </p>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-md-3">
                            <p className="mb-0">
                              <span className="d-inline h6">Tipo: </span>
                              {localProduct.tipo === "P"
                                ? " Produto"
                                : " Serviço"}
                            </p>
                          </div>
                          <div className="col-md-3">
                            <p className="mb-0">
                              <span className="d-inline h6">Condição: </span>
                              {condicaoLabel}
                            </p>
                          </div>
                          <div className="col-md-2">
                            <p className="mb-0">
                              <span className="d-inline h6">
                                Frete grátis:{" "}
                              </span>
                              {localProduct.frete_gratis ? "Sim" : "Não"}
                            </p>
                          </div>
                          <div className="col-md-4">
                            <p className="mb-0">
                              <span className="d-inline h6">Gtin: </span>
                              {localProduct.gtin}
                            </p>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-md-3">
                            <p className="mb-0">
                              <span className="d-inline h6">Marca: </span>
                              {localProduct.marca}
                            </p>
                          </div>
                          <div className="col-md-3">
                            <p className="mb-0">
                              <span className="d-inline h6">Peso bruto: </span>
                              {localProduct.pesobruto || "0"}
                            </p>
                          </div>
                          <div className="col-md-2">
                            <p className="mb-0">
                              <span className="d-inline h6">
                                Peso líquido:{" "}
                              </span>
                              {localProduct.pesoliquido || "0"}
                            </p>
                          </div>

                          <div className="col-md-4">
                            <p className="mb-0">
                              <span className="d-inline h6">
                                Gtin Embalagem:{" "}
                              </span>
                              {localProduct.gtinEmbalagem}
                            </p>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-md-3">
                            <p className="mb-0">
                              <span className="d-inline h6">
                                Preço compra:{" "}
                              </span>
                              {localProduct.precocompra || "R$ 0,00"}
                            </p>
                          </div>
                          <div className="col-md-3">
                            <p className="mb-0">
                              <span className="d-inline h6">Preço custo: </span>
                              {localProduct.precocusto || "R$ 0,00"}
                            </p>
                          </div>
                          <div className="col-md-2">
                            <p className="mb-0">
                              <span className="d-inline h6">Volumes: </span>
                              {localProduct.volumes || "0"}
                            </p>
                          </div>

                          <div className="col-md-4">
                            <p className="mb-0">
                              <span className="d-inline h6">
                                Gtin Embalagem:{" "}
                              </span>
                              {localProduct.gtinEmbalagem}
                            </p>
                          </div>
                        </div>
                        <hr />
                        <div className="row mb-3">
                          <h5>Estoque</h5>
                          <div className="col-md-3">
                            <p className="mb-0">
                              <span className="d-inline h6">Mínimo: </span>
                              {localProduct.estoque.minimo}
                            </p>
                          </div>
                          <div className="col-md-3">
                            <p className="mb-0">
                              <span className="d-inline h6">Máximo: </span>
                              {localProduct.estoque.maximo}
                            </p>
                          </div>
                          <div className="col-md-3">
                            <p className="mb-0">
                              <span className="d-inline h6">
                                Crossdocking:{" "}
                              </span>
                              {localProduct.estoque.crossdocking}
                            </p>
                          </div>
                          <div className="col-md-3">
                            <p className="mb-0">
                              <span className="d-inline h6">Localização: </span>
                              {localProduct.estoque.localizacao}
                            </p>
                          </div>
                        </div>
                      </div>

                      <hr />
                      <div className="row mb-3">
                        <h5>Depósitos</h5>
                        {depositProduct.map((product: any, index: number) => (
                          <div className="row mb-3" key={index}>
                            <div className="col-md-4">
                              <p className="mb-0">
                                <span className="d-inline h6">
                                  {product.deposit_name}
                                </span>
                              </p>
                            </div>
                            <div className="col-md-4">
                              <p className="mb-0">
                                <span className="d-inline h6">
                                  Saldo físico:{" "}
                                </span>
                                {product.saldo_fisico}
                              </p>
                            </div>
                            <div className="col-md-4">
                              <p className="mb-0">
                                <span className="d-inline h6">
                                  Saldo virtual:{" "}
                                </span>
                                {product.saldo_virtual}
                              </p>
                            </div>
                          </div>
                        ))}
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
                    </div>
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

export default DetailModal;
