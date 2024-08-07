"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { fetchProducts, fetchProduct } from "@/services/productService";
import Swal from "sweetalert2";
import GridTableProducts from "@/components/products/GridTable";
import ProductModal from "@/components/products/ProductModal";

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [successMessage, setSuccessMessage] = useState("");
  const modalRef = useRef(null);
  const [editProductId, setEditProductId] = useState<number | null>(null);
  const [situation, setSituation] = useState<string>("");
  const [sources, setSources] = useState<any[]>([]);
  const [product, setProduct] = useState({
    id: 0,
    codigo: "",
    nome: "",
    preco: 0,
    unidade: "",
    tipo: "P",
    situacao: "A",
    condicao: 0,
    formato: "S",
    saldo_fisico_total: 0,
    saldo_virtual_total: 0,
    saldo_fiscao: 0,
    salco_virtual: 0,
  });

  const getProducts = useCallback(
    async (nome: string = "", situacao: string = "") => {
      try {
        setLoading(true);
        const response = await fetchProducts(nome, situacao);
        setProducts(response.products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    getProducts("", situation);
  }, [getProducts, situation]);

  const handleCriterioChange = async (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const situacao = event.target.value;
    setSituation(situacao);
    const response = await fetchProducts("", situacao);
    setProducts(response.products);
    console.log("Situação:", response.products);
    //getProducts("", situacao);
  };

  const handleDetails = async (id: number) => {
    console.log("Details clicked for product:", id);
    const product = await fetchProduct(id);
    console.log("Product details:", product);
  };

  const handleEdit = async (id: number) => {
    console.log("Edit clicked for product:", id);
    try {
      const product = await fetchProduct(id);
      setProduct({
        id: product.id || 0,
        codigo: product.codigo || "",
        nome: product.nome || "",
        preco: product.preco || 0,
        unidade: product.unidade || "",
        tipo: product.tipo || "P",
        situacao: product.situacao || "A",
        condicao: product.condicao || 0,
        formato: product.formato || "S",
        saldo_fisico_total: product.saldo_fisico_total || 0,
        saldo_virtual_total: product.saldo_virtual_total || 0,
        saldo_fiscao: product.saldo_fisico_total || 0,
        salco_virtual: product.saldo_virtual || 0,
      });

      if (window.bootstrap && window.bootstrap.Modal) {
        const modal = new window.bootstrap.Modal(
          document.getElementById("modalProduct"),
        );
        modal.show();
      }
    } catch (error) {
      console.error("Erro ao buscar produto:", error);
    }
  };

  const handleDelete = (id: number) => {
    console.log("Delete clicked for product:", id);
    // Adicione a lógica de exclusão aqui
  };

  const handleNewProduct = () => {
    setProduct({
      id: 0,
      codigo: "",
      nome: "",
      preco: 0,
      unidade: "",
      tipo: "P",
      situacao: "A",
      condicao: 0,
      formato: "S",
      saldo_fisico_total: 0,
      saldo_virtual_total: 0,
      saldo_fiscao: 0,
      salco_virtual: 0,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    console.log(`Field changed: ${name}, Value: ${value}`); // Log de depuração
    setProduct({
      ...product,
      [name]:
        name === "preco" || name === "condicao" ? parseFloat(value) : value,
    });
  };

  const handleSaveProduct = () => {
    console.log("Salvar produto:", product);
    // Adicione a lógica para salvar o produto
    // Depois de salvar, feche o modal e atualize a lista de produtos
  };

  return (
    <>
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
                  <h2>
                    Produtos - <small>Estoque de itens</small>
                  </h2>
                  <p className="m-0">
                    Utilize as ferramentas de busca e filtro para encontrar
                    produtos específicos e gerenciar os produtos de forma
                    eficiente
                  </p>
                </div>

                <div className="d-flex flex-wrap align-items-end justify-content-end gap-2 mb-3 pb-3">
                  <div className="d-md-flex flex-wrap align-items-center gap-2 mb-3 mb-sm-0">
                    <div className="text-center mb-2 mb-md-0">
                      Somente por Situação
                    </div>
                    <select
                      className="form-select w-auto"
                      aria-label="Categories"
                      value={situation}
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
                    type="button"
                    className="btn btn-primary hstack gap-2 align-self-center"
                    data-bs-toggle="modal"
                    data-bs-target="#modalProduct"
                    onClick={handleNewProduct}
                  >
                    <i className="demo-psi-add fs-5" />
                    <span className="vr" />
                    Novo produto
                  </button>
                </div>
                <div className="row">
                  <GridTableProducts
                    data={products}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onDetails={handleDetails}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ProductModal
        product={product}
        onChange={handleChange}
        onSave={handleSaveProduct}
        modalRef={modalRef}
      />
    </>
  );
};

export default Products;
