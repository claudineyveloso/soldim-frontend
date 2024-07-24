"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Grid, h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import Link from "next/link";
import { fetchProductsEmptyStockPage } from "@/services/productService";
import axios from "axios";
import Swal from "sweetalert2";

const ShoppingOptions = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [searchName, setSearchName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridInstanceRef = useRef<any>(null);
  const [editProductId, setEditProductId] = useState<number | null>(null);

  const [situation, setSituation] = useState<string>("");

  const handleClear = () => {
    setLoading(true);
    setSearchName("");
    setSituation("");
    getProductsEmptyStock();
    setLoading(false);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    getProductsEmptyStock(searchName);
    // getProductsEmptyStock(searchName);
  };

  const handleCriterioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLoading(true);
    const selectedSituation = e.target.value;
    setSituation(selectedSituation);
    getProductsEmptyStock();
    // getProductsEmptyStock(searchName, selectedSituation);
    setLoading(false);
  };

  const getProductsEmptyStock = useCallback(
    async (nome: string = "", situacao: string = "") => {
      try {
        setLoading(true);
        console.log(
          "Fetching products with page:",
          nome,
          "situacao:",
          situacao,
        );
        const { products } = await fetchProductsEmptyStockPage();
        // const { products } = await fetchProductsEmptyStockPage(nome, situacao);
        console.log("Fetched products:", products);
        setProducts(products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    getProductsEmptyStock();
  }, [getProductsEmptyStock]);

  const editProduct = async (id: number) => {
    console.log("Edit product with ID:", id);
    try {
      const response = await axios.get(
        `http://localhost:8080/get_product/${id}`,
      );
      let productData;

      // Verifica se a resposta é uma string e tenta parsear como JSON
      if (typeof response.data === "string") {
        productData = JSON.parse(response.data);
      } else {
        productData = response.data;
      }

      setEditProductId(productData.id);

      console.log("Dados do produto retornados:", productData);
      // Atualiza o estado com os dados do produto
      if (window.bootstrap && window.bootstrap.Modal) {
        const modal = new window.bootstrap.Modal(
          document.getElementById("modalProduct"),
        );
        modal.show();
      }
    } catch (error) {
      console.error("Erro ao buscar produto:", error);
    } finally {
    }
    // Implementar lógica para editar usuário
  };

  const deleteProduct = (id: number) => {
    console.log("Delete product with ID:", id);
    // Implementar lógica para excluir usuário
  };

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
              name: "",
              width: "70px",
              formatter: (cell: string) =>
                h("img", {
                  src: cell || "/assets/img/moldura.png", // Caminho da imagem padrão
                  width: 30,
                  height: 30,
                }),
            },
            { name: "Nome" },
            {
              name: "Codigo",
              width: "150px",
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
              width: "120px",
              formatter: (cell: number) =>
                new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(cell),
            },
            {
              name: "Ações",
              width: "120px",
              formatter: (_, row) => {
                const productIndex = row.cells[4].data as number;
                const productId = products[productIndex].id;
                // console.log("Product ID:", productId); // Log do ID do usuário

                const editButton = h(
                  "a",
                  {
                    href: "#",
                    className: "btn btn-icon btn-sm btn-hover btn-primary",
                    onClick: () => {
                      console.log("Edit clicked for search:", productId);
                      editProduct(productId);
                    },
                  },
                  h("i", { className: "demo-pli-pen-5 fs-5" }),
                );
                const deleteButton = h(
                  "a",
                  {
                    href: "#",
                    className: "btn btn-icon btn-sm btn-hover btn-danger",
                    onClick: () => {
                      console.log("Delete clicked for product:", productId);
                      deleteProduct(productId);
                    },
                  },
                  h("i", { className: "demo-pli-trash fs-5" }),
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
          <h1 className="page-title mb-0 mt-2">Lista de opções de compras</h1>
          <p className="lead">
            Visualizar opções de compras de produtos cadastrados no sistema.
          </p>
        </div>
      </div>
      <div className="content__boxed">
        <div className="content__wrap">
          <div className="card mb-3">
            <div className="card-body">
              <div className="mb-3">
                <h2>
                  Produtos - <small>Opções de compras</small>
                </h2>
                <p className="m-0">
                  Utilize as ferramentas de busca e filtro para encontrar
                  produtos específicos e gerenciar seus perfis de forma
                  eficiente
                </p>
              </div>

              <div className="col-md-8 offset-md-2 mb-3">
                <form className="searchbox input-group">
                  <input
                    className="searchbox__input form-control form-control-lg"
                    type="search"
                    placeholder="Localizar um produro..."
                    aria-label="Search"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    onKeyDown={handleKeyPress}
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
                  <select
                    className="form-select w-auto"
                    aria-label="Categories"
                    onChange={handleCriterioChange}
                  >
                    <option value="A">Todos</option>
                    <option value="A">Últimos incluídos</option>
                    <option value="A">Ativos</option>
                    <option value="I">Inativos</option>
                    <option value="E">Excluídos</option>
                  </select>
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
              </div>
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
export default ShoppingOptions;
