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

import { fetchDeposits } from "@/services/depositService";
import { fetchDepositProductByProduct } from "@/services/depositProductService";

const Triages = () => {
  const [triages, setTriages] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deposits, setDeposits] = useState<any[]>([]);
  const [depositProducts, setDepositProducts] = useState<any[]>([]);
  const [selectedDeposit, setSelectedDeposit] = useState(null);
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
    precoCusto: 0,
    precoCompra: 0,
    tipo: "",
    situacao: "",
    formato: "",
    descricaoCurta: "",
    dataValidade: "",
    unidade: "",
    pesoLiquido: 0,
    pesoBruto: 0,
    volumes: 0,
    itensPorCaixa: 0,
    gtin: "",
    gtinEmbalagem: "",
    tipoProducao: "",
    condicao: 0,
    freteGratis: false,
    marca: "",
    descricaoComplementar: "",
    linkExterno: "",
    observacoes: "",
    descricaoEmbalagemDiscreta: "",
    saldoFisicoTotal: 0,
    saldoVirtualTotal: 0,
    saldoFisico: 0,
    saldoVirtual: 0,
    estoque: {
      minimo: 0,
      maximo: 0,
      crossdocking: 0,
      localizacao: "",
    },
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

  const getDeposits = useCallback(async () => {
    try {
      const response = await fetchDeposits();
      if (response && Array.isArray(response)) {
        setDeposits(response); // Agora o response é o próprio array de depósitos
        const defaultDeposit = response.find(
          (deposit) => deposit.padrao === true,
        );
        if (defaultDeposit) {
          setSelectedDeposit(defaultDeposit.id); // Define o id do depósito padrão como selecionado
        }
      } else {
        setDeposits([]);
      }
    } catch (error) {
      console.error("Failed to fetch deposits:", error);
    }
  }, []);

  useEffect(() => {
    getDeposits();
  }, [getDeposits]);

  const getDepositProductByProduct = useCallback(async (productId: number) => {
    try {
      const response = await fetchDepositProductByProduct(productId);
      if (response && Array.isArray(response.depositProducts)) {
        setDepositProducts(response.depositProducts);
      } else {
        setDepositProducts([]);
      }
    } catch (error) {
      console.error("Failed to fetch deposit products:", error);
    }
  }, []);

  useEffect(() => {
    if (triage.id) {
      //getDepositProductByProduct(triage.id);
      getDepositProductByProduct(0);
    }
  }, [triage.id, getDepositProductByProduct]); // Passa a função como dependência

  const handleEdit = async (id: string) => {
    console.log("Edit clicked for triage:", id);
    try {
      const triage = await fetchTriage(id);

      console.log("Triage to edit:", triage);

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
        precoCusto: triage.precoCusto,
        precoCompra: triage.precoCompra,
        tipo: triage.tipo,
        situacao: triage.situacao,
        formato: triage.formato,
        descricaoCurta: triage.descricaoCurta,
        dataValidade: triage.dataValidade,
        unidade: triage.unidade,
        pesoLiquido: triage.pesoLiquido,
        pesoBruto: triage.pesoBruto,
        volumes: triage.volumes,
        itensPorCaixa: triage.itensPorCaixa,
        gtin: triage.gtin,
        gtinEmbalagem: triage.gtinEmbalagem,
        tipoProducao: triage.tipoProducao,
        condicao: triage.condicao,
        freteGratis: triage.freteGratis,
        marca: triage.marca,
        descricaoComplementar: triage.descricaoComplementar,
        linkExterno: triage.linkExterno,
        observacoes: triage.observacoes,
        descricaoEmbalagemDiscreta: triage.descricaoEmbalagemDiscreta,
        saldoFisicoTotal: triage.saldoFisicoTotal,
        saldoVirtualTotal: triage.saldoVirtualTotal,
        saldoFisico: triage.saldoFisico,
        saldoVirtual: triage.saldoVirtual,
        estoque: {
          minimo: triage.estoque?.minimo || 0,
          maximo: triage.estoque?.maximo || 0,
          crossdocking: triage.estoque?.crossdocking || 0,
          localizacao: triage.estoque?.localizacao || "",
        },
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    // Verifica se o nome do campo é 'price' e converte o valor para número

    const newValue =
      name === "price" ||
      name === "send_to_batch" ||
      name === "send_to_bling" ||
      name === "defect"
        ? Number(value)
        : value;

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
                  <div className="row">
                    {loading ? (
                      <p>Carregando produtos...</p>
                    ) : (
                      <GridTableTriages
                        data={triages}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onDetails={handleEdit}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <TriageModal
          triage={triage}
          deposits={deposits}
          defaultDeposit={selectedDeposit}
          onChange={handleChange}
          onSave={handleSaveDraft}
          modalRef={modalRef}
        />
      </AuthWrapper>
    </>
  );
};

export default Triages;
