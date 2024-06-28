"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Grid, h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import Link from "next/link";
import { fetchProducts } from "@/services/productService";

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [searchName, setSearchName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridInstanceRef = useRef<any>(null);

  const getProducts = useCallback(async (name: string = "") => {
    try {
      setLoading(true);
      const page = 1;
      const limit = 100;
      console.log(
        "Fetching products with page:",
        page,
        "limit:",
        limit,
        "and name:",
        name,
      );
      const { products } = await fetchProducts(page, limit, name);
      console.log("Fetched products:", products);
      setProducts(products);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  useEffect(() => {
    if (!loading && containerRef.current) {
      if (gridInstanceRef.current) {
        gridInstanceRef.current
          .updateConfig({
            data: products.map((product, index) => [
              product.imagemURL,
              product.nome,
              product.codigo
                ? String(product.codigo)
                : h(
                    "span",
                    { className: "text-danger fw-bolder" },
                    "Não informado",
                  ),
              product.preco,
              index,
            ]),
          })
          .forceRender();
      } else {
        console.log("Rendering grid with products:", products);

        const container = containerRef.current;

        const grid = new Grid({
          className: {
            table: "table table-striped",
            thead: "thead-dark",
          },
          columns: [
            {
              name: "Imagem",
              width: "30px",
              formatter: (cell: string) =>
                h("img", {
                  src: cell || "/assets/img/moldura.png", // Caminho da imagem padrão
                  width: 30,
                  height: 30,
                }),
            },
            { name: "Nome", width: "200px" },
            {
              name: "Codigo",
              width: "50px",
              formatter: (cell: string) =>
                cell
                  ? cell
                  : h(
                      "span",
                      { className: "text-danger fw-bolder" },
                      "Código vazio",
                    ),
            },
            {
              name: "Preço",
              width: "50px",
              formatter: (cell: number) =>
                new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(cell),
            },
            {
              name: "Ações",
              width: "150px",
              formatter: (_, row) => {
                const productIndex = row.cells[4].data as number;
                const productId = products[productIndex].id;
                console.log("Product ID:", productId); // Log do ID do usuário

                const editButton = h(
                  "button",
                  {
                    className: "btn btn-sm btn-outline-primary me-2",
                    onClick: () => {
                      console.log("Edit clicked for search:", productId);
                      editProduct(productId);
                    },
                  },
                  "Editar",
                );
                const deleteButton = h(
                  "button",
                  {
                    className: "btn btn-sm btn-outline-danger",
                    onClick: () => {
                      console.log("Delete clicked for product:", productId);
                      deleteProduct(productId);
                    },
                  },
                  "Deletar",
                );
                return h("div", {}, [editButton, deleteButton]);
              },
            },
          ],
          sort: true,
          data: products.map((product, index) => [
            product.imagemURL,
            product.nome,
            product.codigo,
            product.preco,
            index,
          ]),
        });

        grid.render(container);
        gridInstanceRef.current = grid;
      }
    }
  }, [loading, products]);

  const handleSearch = () => {
    getProducts(searchName);
  };

  const handleClear = () => {
    setSearchName("");
    getProducts();
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const editProduct = (id: number) => {
    console.log("Edit product with ID:", id);
    // Implementar lógica para editar usuário
  };

  const deleteProduct = (id: number) => {
    console.log("Delete product with ID:", id);
    // Implementar lógica para excluir usuário
  };

  return (
    <section id="content" className="content">
      <div className="content__header content__boxed overlapping">
        <div className="content__wrap">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/dashboard">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Produtos
              </li>
            </ol>
          </nav>
          <h1 className="page-title mb-0 mt-2">Lista de produtos</h1>
          <p className="lead">Visualizar produtos cadastrados no sistema.</p>
        </div>
      </div>
      <div className="content__boxed">
        <div className="content__wrap">
          <div className="card mb-3">
            <div className="card-body">
              <div className="mb-3">
                <h2>Produtos</h2>
                <p className="m-0">
                  Utilize as ferramentas de busca e filtro para encontrar
                  produtos específicos e gerenciar seus perfis de forma
                  eficiente
                </p>
              </div>
              <div className="row">
                <div className="col-md-6 d-flex gap-1 align-items-center justify-content-md-start mb-3">
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Localizar..."
                      className="form-control"
                      autoComplete="off"
                      value={searchName}
                      onChange={(e) => setSearchName(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                  </div>
                  <div className="btn-group">
                    <button className="btn btn-primary" onClick={handleSearch}>
                      Buscar
                    </button>
                    <button
                      className="btn btn-secondary ms-2"
                      onClick={handleClear}
                    >
                      Limpar
                    </button>
                  </div>
                </div>

                <div className="col-md-6 d-flex gap-1 justify-content-md-end align-items-center mb-3">
                  <button
                    type="button"
                    className="btn btn-primary hstack gap-2 align-self-center"
                    data-bs-toggle="modal"
                    data-bs-target="#modalProduct"
                  >
                    <i className="demo-psi-add fs-5"></i>
                    <span className="vr"></span>
                    Novo produto
                  </button>
                </div>
                <div
                  className="modal fade"
                  id="modalProduct"
                  tabIndex={-1}
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
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
                                    id="_dm-inputAddress"
                                    type="text"
                                    className="form-control"
                                    placeholder=""
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
                                    id="_dm-inputAddress2"
                                    type="text"
                                    className="form-control"
                                    placeholder=""
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
                                    id="_dm-inputAddress2"
                                    type="text"
                                    className="form-control"
                                    placeholder=""
                                  />
                                </div>

                                <div className="col-md-6">
                                  <label
                                    htmlFor="_dm-inputCity"
                                    className="form-label"
                                  >
                                    Unidade
                                  </label>
                                  <input
                                    id="_dm-inputCity"
                                    type="text"
                                    className="form-control"
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
                                    id="inputState"
                                    className="form-select"
                                  >
                                    <option value="S" selected={true}>
                                      Simples ou com variação
                                    </option>
                                    <option value="E">Com composição</option>
                                  </select>
                                </div>

                                <div className="col-md-6">
                                  <label
                                    htmlFor="inputState"
                                    className="form-label"
                                  >
                                    Tipo
                                  </label>
                                  <select
                                    id="inputState"
                                    className="form-select"
                                  >
                                    <option value="P" selected={true}>
                                      Produto
                                    </option>
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
                                    id="inputState"
                                    className="form-select"
                                  >
                                    <option value="0" selected={true}>
                                      Não especificado
                                    </option>
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

              <hr />
              <h3 className="h4">Listagem</h3>
              {loading ? (
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: "200px" }}
                >
                  <button
                    className="btn btn-primary text-center"
                    type="button"
                    disabled
                  >
                    <span
                      className="spinner-border spinner-border-sm me-3"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Aguarde... Carregando os produtos.
                  </button>
                </div>
              ) : (
                <div id="_dm-gridjsSorting" ref={containerRef}></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
