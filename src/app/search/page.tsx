"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";

import { Grid, h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import Link from "next/link";
import {
  fetchSearches,
  fetchSearch,
  deleteSearch,
} from "@/services/searchService";

import { deleteDraftsBySearchID } from "@/services/draftService";

import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";

import { AuthWrapper } from "@/components/AuthWrapper";
import GridTableSearches from "@/components/searches/GridTable";

import SearchModal from "@/components/searches/SearchModal";

const Searches = () => {
  const [searches, setSearches] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<any>({
    description: "",
    created_at: "",
  });

  const modalRef = useRef(null);

  const getSearches = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetchSearches();
      if (response && response.searches) {
        setSearches(response.searches);
      } else {
        setSearches([]);
      }
    } catch (error) {
      console.error("Failed to fetch searches:", error);
      setSearches([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getSearches();
  }, [getSearches]);

  const handleDetails = async (id: string) => {
    console.log("Details clicked for search:", id);
    try {
      const search = await fetchSearch(id);
      setSearch({
        id: search.id || 0,
        description: search.description || "",
      });

      if (window.bootstrap && window.bootstrap.Modal) {
        const modal = new window.bootstrap.Modal(
          document.getElementById("modalSearch"),
        );
        modal.show();
      }
    } catch (error) {
      console.error("Erro ao buscar produto:", error);
    }
  };

  const handleEdit = async (id: string) => {
    console.log("Edit clicked for product:", id);
    try {
      const search = await fetchSearch(id);
      setSearch({
        id: search.id || 0,
        description: search.description || "",
      });

      if (window.bootstrap && window.bootstrap.Modal) {
        const modal = new window.bootstrap.Modal(
          document.getElementById("modalSearch"),
        );
        modal.show();
      }
    } catch (error) {
      console.error("Erro ao buscar produto:", error);
    }
  };

  const confirmDelete = (id: string) => {
    Swal.fire({
      title: "Deseja excluir este item?",
      text: "Você não poderá reverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, exclua isso!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteSearch(id);
      }
    });
  };

  const handleDeleteSearch = async (id: string) => {
    console.log("Delete result with ID:", id);
    try {
      await deleteDraftsBySearchID(id);
      const success = await deleteSearch(id);
      if (success) {
        toast.success("Item do Resultado da Busca deletado com sucesso");
        await getSearches();
      } else {
        toast.error("Erro ao deletar resultado");
      }
    } catch (error) {
      toast.error("Erro ao deletar resultado da busca");
      console.error("Erro ao deletar resultado:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setSearch({
      ...search,
      [name]: value,
    });
  };

  const handleSaveSearch = () => {
    console.log("Salvar produto:", search);
    // Adicione a lógica para salvar o produto
    // Feche o modal após salvar o produto
    if (modalRef.current) {
      const modalInstance = window.bootstrap.Modal.getInstance(
        modalRef.current,
      );
      if (modalInstance) {
        modalInstance.hide();
      }
    }
    getSearches(); // Atualize a lista de produtos
  };

  return (
    <>
      <AuthWrapper>
        <section id="content" className="content">
          <div className="content__header content__boxed overlapping">
            <div className="content__wrap">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="/dashboard">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Coleta
                  </li>
                </ol>
              </nav>
              <h1 className="page-title mb-0 mt-2">
                Lista de produtos pesquisados na Web
              </h1>
              <p className="lead">
                Visualizar produtos pesquisados na Web cadastrados no sistema.
              </p>
            </div>
          </div>

          <div className="content__boxed">
            <div className="content__wrap">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="mb-3">
                    <h2>
                      Produtos - <small>Coleta na Web</small>
                    </h2>
                    <p className="m-0">
                      Utilize as ferramentas de busca e filtro para encontrar
                      produtos específicos e gerenciar os produtos de forma
                      eficiente
                    </p>
                  </div>
                  <div className="row">
                    <GridTableSearches
                      data={searches}
                      onEdit={handleEdit}
                      onDelete={confirmDelete}
                      onDetails={handleDetails}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SearchModal
          search={search}
          onChange={handleChange}
          onSave={handleSaveSearch}
          modalRef={modalRef}
        />
      </AuthWrapper>
    </>
  );
};

export default Searches;
