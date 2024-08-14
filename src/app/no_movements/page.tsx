"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  fetchProductsNoMovements,
  fetchProduct,
} from "@/services/productService";
import Swal from "sweetalert2";
import GridTableProductsNoMovement from "@/components/products_no_movement/GridTable";
import ProductModal from "@/components/products/ProductModal";

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const modalRef = useRef(null);
  const [situation, setSituation] = useState<string>("A"); // Situação inicial definida
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

  const getProducts = useCallback(async (situacao: string) => {
    try {
      setLoading(true);
      const response = await fetchProductsNoMovements("", situacao);
      setProducts(response.products);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getProducts(situation);
  }, [getProducts, situation]);

  const handleCriterioChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const situacao = event.target.value;
    setSituation(situacao);
  };

  const handleEdit = async (id: number) => {
    console.log("Edit clicked for product:", id);
    try {
      const product = await fetchProduct(id);
      setProduct({
        codigo: product.codigo || "",
        nome: product.nome || "",
        preco: product.preco ? product.preco.toString() : "",
        unidade: product.unidade || "",
        tipo: product.tipo || "P",
        situacao: product.situacao || "A",
        condicao: product.condicao || "0",
        formato: product.formato || "S",
      });

      if (window.bootstrap && window.bootstrap.Modal) {
        const modal = new window.bootstrap.Modal(
          document.getElementById("modalProduct"),
        );
        modal.show();
      }
    } catch (error) {
      console.error("Erro ao buscar produto sem movimento:", error);
    }
  };

  const handleDelete = (id: number) => {
    console.log("Delete clicked for product:", id);
    // Adicione a lógica de exclusão aqui
  };

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
                </div>
                <div className="row">
                  <GridTableProductsNoMovement
                    data={products}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Products;
