"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  fetchSalesOrders,
  fetchSalesOrder,
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
    id: 0,
    numero: 0,
    numeroloja: "",
    data: "",
    datasaida: "",
    dataprevista: "",
    totalprodutos: 0,
    totaldescontos: 0,
    situation_id: 0,
    store_id: 0,
    contact_id: 0,
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

  const handleDetails = async (id: number) => {
    console.log("Details clicked for product:", id);
    try {
      const product = await fetchSalesOrder(id);

      setSalesOrder({
        id: product.id || "",
        numero: product.numero || "",
        numeroloja: product.numeroloja || 0,
        data: product.data || "",
        datasaida: product.datasaida || "P",
        dataprevista: product.dataprevista || "A",
        totalprodutos: product.totalprodutos || 0,
        totaldescontos: product.totaldescontos || "S",
        situation_id: product.situation_id || 0,
        store_id: product.store_id || 0,
        contact_id: product.contact_id || 0,
      });

      if (window.bootstrap && window.bootstrap.Modal) {
        const modal = new window.bootstrap.Modal(
          document.getElementById("modalDetailProduct"),
        );
        modal.show();
      }
    } catch (error) {
      console.error("Erro ao buscar produto:", error);
    }
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
                    onDetails={handleDetails}
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
