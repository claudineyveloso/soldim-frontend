"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  fetchProductsSalesOrders,
  fetchSalesOrders,
} from "@/services/salesOrderService";

import Swal from "sweetalert2";
import GridTableSalesOrders from "@/components/sales_orders/GridTable";

import ProductModal from "@/components/products/ProductModal";

const ProductSalesOrders = () => {
  const [salesOrders, setSalesOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [successMessage, setSuccessMessage] = useState("");
  const modalRef = useRef(null);
  const [editSalesOrderId, setEditSalesOrderId] = useState<number | null>(null);
  const [salesOrder, setSalesOrder] = useState({
    codigo: "",
    nome: "",
    preco: "",
    unidade: "",
    tipo: "P",
    situacao: "A",
    condicao: "0",
    formato: "S",
  });

  const getSalesOrders = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetchSalesOrders();
      console.log("Sales Orders fetched:", response.salesOrders);
      setSalesOrders(response.salesOrders);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getSalesOrders();
  }, [getSalesOrders]);

  const handleEdit = async (id: number) => {
    console.log("Edit clicked for product:", id);
    try {
      const product = await fetchProduct(id);
      setSalesOrder({
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
      console.error("Erro ao buscar produto do pedido de venda:", error);
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
                </li>{" "}
                <li className="breadcrumb-item active" aria-current="page">
                  Vendas
                </li>
              </ol>
            </nav>
            <h1 className="page-title mb-0 mt-2">Lista de pedidos de vendas</h1>
            <p className="lead">
              Visualizar pedidos de vendas cadastrados no sistema.
            </p>
          </div>
        </div>

        <div className="content__boxed">
          <div className="content__wrap">
            <div className="card mb-3">
              <div className="card-body">
                <div className="mb-3">
                  <h2>
                    Vendas - <small>Pedidos de vendas</small>
                  </h2>
                  <p className="m-0">
                    Utilize as ferramentas de busca e filtro para encontrar
                    pedidos de vendas específicos e gerenciar os pedidos de
                    vendas de forma eficiente
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
                  <GridTableSalesOrders
                    data={salesOrders}
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
export default ProductSalesOrders;
