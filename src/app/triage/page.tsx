"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { fetchTriages, fetchTriage } from "@/services/triageService";
import Swal from "sweetalert2";
import GridTableTriages from "@/components/triages/GridTable";
import ProductModal from "@/components/products/ProductModal";

const Triages = () => {
  const [triages, setTriages] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [successMessage, setSuccessMessage] = useState("");
  const modalRef = useRef(null);
  const [editTriageId, setEditTriageId] = useState<number | null>(null);
  const [triage, setTriage] = useState({
    codigo: "",
    nome: "",
    preco: "",
    unidade: "",
    tipo: "P",
    situacao: "A",
    condicao: "0",
    formato: "S",
  });

  const getTriages = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetchTriages();
      console.log("Triages fetched:", response.triages);
      setTriages(response.triages);
    } catch (error) {
      console.error("Failed to fetch triages:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getTriages();
  }, [getTriages]);

  const handleCriterioChange = async (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const situacao = event.target.value;
    setSituation(situacao);
    const response = await fetchTriages();
    setTriages(response.triages);
  };

  const handleEdit = async (id: string) => {
    console.log("Edit clicked for product:", id);
    try {
      const triage = await fetchTriage(id);
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
      console.error("Erro ao buscar produto:", error);
    }
  };

  const handleDelete = (id: string) => {
    console.log("Delete clicked for product:", id);
    // Adicione a lógica de exclusão aqui
  };

  const handleNewProduct = () => {
    setTriage({
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
    setTriage({
      ...triage,
    });
  };

  const handleSaveProduct = () => {
    console.log("Salvar produto:", triage);
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
                  Produtos para Triagem
                </li>
              </ol>
            </nav>
            <h1 className="page-title mb-0 mt-2">
              Lista de produtos para triagens
            </h1>
            <p className="lead">
              Visualizar os produtos para triagens importadas para o sistema.
            </p>
          </div>
        </div>

        <div className="content__boxed">
          <div className="content__wrap">
            <div className="card mb-3">
              <div className="card-body">
                <div className="mb-3">
                  <h2>
                    Triagem - <small>Produtos para triagem</small>
                  </h2>
                  <p className="m-0">
                    Utilize as ferramentas de busca e filtro para encontrar
                    produtos para triagem específicos e gerenciar os produtos
                    para triagem de forma eficiente
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
                      // value={situation}
                      //onChange={handleCriterioChange}
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
                  <GridTableTriages
                    data={triages}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onDetails={handleEdit}
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
export default Triages;
