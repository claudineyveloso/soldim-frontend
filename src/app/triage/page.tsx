"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { AuthWrapper } from "@/components/AuthWrapper";
import {
  fetchTriages,
  fetchTriage,
  updateTriage,
} from "@/services/triageService";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";

import GridTableTriages from "@/components/triages/GridTable";
import TriageModal from "@/components/triages/TriageModal";

const Triages = () => {
  const [triages, setTriages] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [successMessage, setSuccessMessage] = useState("");
  const modalRef = useRef(null);
  const [editTriageId, setEditTriageId] = useState<number | null>(null);
  const [triage, setTriage] = useState({
    id: "",
    type: "",
    grid: "",
    sku_sap: 0,
    sku_wms: "",
    description: "",
    cust_id: 0,
    seller: "",
    quantity_supplied: 0,
    final_quantity: 0,
    unitary_value: 0,
    total_value_offered: 0,
    final_total_value: 0,
    category: "",
    sub_category: "",
    sent_to_batch: false,
    sent_to_bling: false,
    defect: false,
  });
  const [situation, setSituation] = useState("A");

  const getTriages = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetchTriages();
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

  const handleEdit = async (id: string) => {
    console.log("Edit clicked for triage:", id);
    try {
      const triage = await fetchTriage(id);

      setTriage({
        id: triage.id,
        type: triage.type,
        grid: triage.grid,
        sku_sap: triage.sku_sap,
        sku_wms: triage.sku_wms,
        description: triage.description,
        cust_id: triage.cust_id,
        seller: triage.seller,
        quantity_supplied: triage.quantity_supplied,
        final_quantity: triage.final_quantity,
        unitary_value: triage.unitary_value,
        total_value_offered: triage.total_value_offered,
        final_total_value: triage.final_total_value,
        category: triage.category,
        sub_category: triage.sub_category,
        sent_to_batch: triage.sent_to_batch,
        sent_to_bling: triage.sent_to_bling,
        defect: triage.defect,
      });
      //
      if (window.bootstrap && window.bootstrap.Modal) {
        const modal = new window.bootstrap.Modal(
          document.getElementById("modalProduct"),
        );
        modal.show();
      }
    } catch (error) {
      console.error("Erro ao buscar produto da triagem:", error);
    }
  };

  const handleCriterioChange = async (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const situacao = event.target.value;
    setSituation(situacao);
    getTriages(); // Atualiza a lista de triagens com o novo filtro
  };

  const handleDelete = async (id: string) => {
    console.log("Delete clicked for triage:", id);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    // Verifica se o nome do campo é 'price' e converte o valor para número
    const newValue = name === "price" ? parseFloat(value) : value;

    console.log(`Field name: ${name}`);
    console.log(`Field value: ${value}`);
    console.log(`Converted value (if applicable): ${newValue}`);

    // Atualiza o estado draft com o novo valor
    setTriage((prevTriage) => ({
      ...prevTriage,
      [name]: newValue,
    }));
  };

  const handleSaveDraft = () => {
    handleUpdateDraft();
  };

  const handleUpdateDraft = async () => {
    try {
      // Certifique-se de que 'draft' contém todos os campos necessários
      console.log("Draft to update:", triage); // Adicione este log
      const triageToUpdate = {
        id: triage.id,
        type: triage.type,
        grid: triage.grid,
        sku_sap: triage.sku_sap,
        sku_wms: triage.sku_wms,
        description: triage.description,
        cust_id: triage.cust_id,
        seller: triage.seller,
        quantity_supplied: triage.quantity_supplied,
        final_quantity: triage.final_quantity,
        unitary_value: triage.unitary_value,
        total_value_offered: triage.total_value_offered,
        final_total_value: triage.final_total_value,
        category: triage.category,
        sub_category: triage.sub_category,
        sent_to_batch: triage.sent_to_batch,
        sent_to_bling: triage.sent_to_bling,
        defect: triage.defect,
      };

      console.log("Draft to update (formatted):", triageToUpdate); // Adicione este log

      // Passa o draftToUpdate completo para a função updateDraft
      const success = await updateTriage(triageToUpdate);

      if (success) {
        toast.success("Produto atualizado com sucesso");
        await getTriages(); // Atualiza a lista de drafts
        if (window.bootstrap && window.bootstrap.Modal) {
          const modal = new window.bootstrap.Modal(
            document.getElementById("modalDraft"),
          );
          modal.hide();
        }
      } else {
        toast.error("Erro ao atualizar produto");
      }
    } catch (error) {
      toast.error("Erro ao atualizar produto");
      console.error("Erro ao atualizar produto:", error);
    }
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
                        value={situation}
                        onChange={handleCriterioChange}
                      >
                        <option value="A">Todos</option>
                        <option value="L">Últimos incluídos</option>
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
        <TriageModal
          triage={triage}
          onChange={handleChange}
          onSave={handleSaveDraft}
          modalRef={modalRef}
        />
      </AuthWrapper>
    </>
  );
};

export default Triages;
