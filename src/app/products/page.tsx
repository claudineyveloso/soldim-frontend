"use client";
import React, { useState, useEffect, useRef } from "react";
import { Grid, h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import Link from "next/link";
import { fetchProducts } from "@/services/productService";

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [searchName, setSearchName] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);
  const gridInstanceRef = useRef<Grid | null>(null);

  const getProducts = async (name: string = "") => {
    try {
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
      const { products, totalPages } = await fetchProducts(page, limit, name);
      console.log("Fetched products:", products);
      setProducts(products);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (containerRef.current && products.length > 0) {
      console.log("Rendering grid with products:", products);

      const container = containerRef.current;

      // Limpar o contêiner antes de renderizar a tabela
      container.innerHTML = "";

      // Destruir a instância existente do Grid.js, se houver
      if (gridInstanceRef.current) {
        gridInstanceRef.current.destroy();
      }

      // Criar nova instância do Grid.js
      const grid = new Grid({
        className: {
          table: "table table-striped",
          thead: "thead-dark",
        },
        columns: [
          {
            name: "Imagem",
            width: "50px",
            formatter: (cell: string) =>
              h("img", {
                src: cell || "/assets/img/moldura.png", // Caminho da imagem padrão
                width: 50,
                height: 50,
              }),
          },
          { name: "Nome", width: "200px" },
          { name: "Codigo", width: "50px" },
          {
            name: "Preço",
            width: "50px",
            formatter: (cell: number) =>
              new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(cell),
          },
          { name: "Tipo", width: "50px" },
          { name: "Situação", width: "50px" },
          { name: "Formato", width: "50px" },
          { name: "Descrição", width: "50px" },
        ],
        sort: true,
        data: products.map((product) => [
          product.imagemURL,
          product.nome,
          product.codigo,
          product.preco,
          product.tipo,
          product.situacao,
          product.formato,
          product.descricaoCurta,
        ]),
      });

      grid.render(container);
      gridInstanceRef.current = grid; // Armazenar a instância atual do Grid.js
    }
  }, [products]);

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
                  <button className="btn btn-primary hstack gap-2 align-self-center">
                    <i className="demo-psi-add fs-5"></i>
                    <span className="vr"></span>
                    Novo produto
                  </button>
                </div>
              </div>

              <hr />
              <h3 className="h4">Listagem</h3>
              {products.length === 0 ? (
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
