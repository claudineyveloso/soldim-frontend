"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Grid, h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import Link from "next/link";
import { fetchProducts } from "@/services/productService";
import axios from "axios";
import Swal from "sweetalert2";
import { get } from "http";
import Pagination from "@/components/Pagination";

const Triages = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [searchName, setSearchName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridInstanceRef = useRef<any>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const modalRef = useRef(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Define the page size
  const [editProductId, setEditProductId] = useState<number | null>(null);
  const [product, setProduct] = useState({
    codigo: "",
    nome: "",
    preco: "",
    unidade: "",
    tipo: "P",
    situacao: "A",
    condicao: "0",
    formato: "S",
  });

  const handleSearch = (event?: React.FormEvent) => {
    if (event) {
      event.preventDefault();
    }
    getProducts(searchName);
  };

  const getProducts = useCallback(
    async (nome: string = "", limit: number = 10, offset: number = 0) => {
      try {
        setLoading(true);
        console.log("Fetching products with nome:", nome);
        const { products, totalCount } = await fetchProducts(
          nome,
          limit,
          offset,
        );
        console.log("Fetched products nao está funcionando:", products);
        setProducts(products);
        setTotalCount(totalCount);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleClear = () => {
    setLoading(true);
    setSearchName("");
    getProducts();
    setLoading(false);
  };

  useEffect(() => {
    getProducts("", pageSize, (currentPage - 1) * pageSize);
  }, [getProducts, currentPage, pageSize]);

  const totalPages = Math.ceil(totalCount / pageSize);

  const handleNewProduct = () => {
    setProduct({
      codigo: "",
      nome: "",
      preco: "",
      unidade: "",
      tipo: "P",
      situacao: "A",
      condicao: "0",
      formato: "S",
    });
  };

  const handleSaveProduct = async () => {
    const url = editProductId
      ? `http://localhost:8080/update_product?productID=${editProductId}`
      : "http://localhost:8080/create_product";
    const method = editProductId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        const successMessage = editProductId
          ? "Produto atualizado com sucesso!"
          : "Produto criado com sucesso!";
        console.log(successMessage);
        setSuccessMessage(successMessage);

        // Mostrar mensagem de sucesso com SweetAlert2
        Swal.fire({
          icon: "success",
          title: "Sucesso!",
          text: successMessage,
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
        });

        setTimeout(() => setSuccessMessage(""), 3000);
        setProduct({
          codigo: "",
          nome: "",
          preco: "",
          unidade: "",
          tipo: "",
          situacao: "",
          condicao: "",
          formato: "S",
        });
        setEditProductId(null); // Limpar o editProductId após salvar
        // Adicionar lógica para fechar o modal ou limpar o formulário
        //getProducts();
        //setLoading(false);
        const modalElement = document.getElementById("modalProduct");
        if (modalElement) {
          const modal = window.bootstrap.Modal.getInstance(modalElement);
          if (modal) {
            modal.hide();
          }
        }
        setLoading(true);
        getProducts();
        setLoading(false);
      } else {
        const errorMessage = editProductId
          ? "Erro ao atualizar produto"
          : "Erro ao criar produto";
        console.error(errorMessage);
        Swal.fire({
          icon: "error",
          title: "Erro!",
          text: errorMessage,
        });
      }
    } catch (error) {
      const errorMessage = editProductId
        ? "Erro ao atualizar produto. Por favor, tente novamente mais tarde."
        : "Erro ao criar produto. Por favor, tente novamente mais tarde.";
      console.error(errorMessage, error);
      Swal.fire({
        icon: "error",
        title: "Erro!",
        text: errorMessage,
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    console.log(`Field changed: ${name}, Value: ${value}`); // Log de depuração
    setProduct({
      ...product,
      [name]: value,
    });
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
                Tragem de Produtos
              </li>
            </ol>
          </nav>
          <h1 className="page-title mb-0 mt-2">Lista de coleta de produtos</h1>
          <p className="lead">
            Visualizar, adicionar, editar e excluir coletas cadastrados no
            sistema.
          </p>
        </div>
      </div>
      <div className="content__boxed">
        <div className="content__wrap">
          <div className="card mb-3">
            <div className="card-body">
              <div className="mb-3">
                <h2>
                  Produtos - <small>Estoque de itens</small>
                </h2>
                <p className="m-0">
                  Utilize as ferramentas de busca e filtro para encontrar
                  produtos específicos e gerenciar seus perfis de forma
                  eficiente
                </p>
              </div>

              <div className="col-md-8 offset-md-2 mb-3">
                <form className="searchbox input-group" onSubmit={handleSearch}>
                  <input
                    className="searchbox__input form-control form-control-lg"
                    type="search"
                    placeholder="Localizar um produto..."
                    aria-label="Search"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    onKeyUp={handleKeyUp}
                  />
                  <div className="searchbox__btn-group">
                    <button
                      className="searchbox__btn btn btn-icon bg-transparent shadow-none border-0 btn-sm"
                      type="submit"
                    >
                      <i className="demo-pli-magnifi-glass"></i>
                    </button>
                  </div>
                </form>
              </div>

              <div className="d-flex flex-wrap align-items-end justify-content-center gap-2 mb-3 pb-3">
                <div className="d-md-flex flex-wrap align-items-center gap-2 mb-3 mb-sm-0">
                  <div className="text-center mb-2 mb-md-0">
                    Somente por Situação
                  </div>
                </div>
                <button
                  className="btn btn-light mb-3 mb-sm-0"
                  onClick={handleSearch}
                >
                  Filtrar
                </button>
                <button
                  className="btn btn-light mb-3 mb-sm-0"
                  onClick={handleClear}
                >
                  Limpar
                </button>
                <button
                  type="button"
                  className="btn btn-primary hstack gap-2 align-self-center"
                  data-bs-toggle="modal"
                  data-bs-target="#modalProduct"
                  onClick={handleNewProduct}
                >
                  <i className="demo-psi-add fs-5"></i>
                  <span className="vr"></span>
                  Novo produto
                </button>
              </div>
              {/*
              
                <div className="col-md-6 d-flex gap-1 align-items-center justify-content-md-start mb-3">
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Localizar..."
                      className="form-control"
                      autoComplete="off"
                      //value={searchName}
                      //onChange={(e) => setSearchName(e.target.value)}
                      //onKeyDown={handleKeyPress}
                    />
                  </div>
                  <div className="btn-group">
                    <button
                      className="btn btn-primary"
                      //onClick={handleSearch}
                    >
                      Buscar
                    </button>
                    <button
                      className="btn btn-secondary ms-2"
                      //onClick={handleClear}
                    >
                      Limpar
                    </button>
                  </div>
                </div>


              */}
              <div className="row">
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
                                    id="nome"
                                    name="nome"
                                    type="text"
                                    className="form-control"
                                    placeholder=""
                                    value={product.nome}
                                    onChange={handleChange}
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
                                    onChange={handleChange}
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
                                    onChange={handleChange}
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
                                    id="unidade"
                                    name="unidade"
                                    type="text"
                                    className="form-control"
                                    value={product.unidade}
                                    onChange={handleChange}
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
                                    id="formato"
                                    name="formato"
                                    className="form-select"
                                    value={product.formato}
                                    onChange={handleChange}
                                  >
                                    <option value="S">
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
                                    id="tipo"
                                    name="tipo"
                                    className="form-select"
                                    value={product.tipo}
                                    onChange={handleChange}
                                  >
                                    <option value="P">Produto</option>
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
                                    id="condicao"
                                    name="condicao"
                                    className="form-select"
                                    value={product.condicao}
                                    onChange={handleChange}
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
                                    onClick={handleSaveProduct}
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
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Triages;
