"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  fetchDraft,
  fetchDrafts,
  deleteDraft,
  updateDraft,
} from "@/services/draftService";
import { createProduct } from "@/services/productService";

import { fetchDeposits } from "@/services/depositService";
import { fetchDepositProductByProduct } from "@/services/depositProductService";

import { AuthWrapper } from "@/components/AuthWrapper";

import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import GridTableDrafts from "@/components/drafts/GridTable";
import DraftModal from "@/components/drafts/DraftModal";

interface Draft {
  id: string;
  codigo: string;
  tipo: string;
  situacao: string;
  formato: string;
  descricaoCurta: string;
  image_url: string;
  description: string;
  dataValidade: string;
  unidade: string;
  pesoLiquido: number;
  pesoBruto: number;
  volumes: number;
  itensPorCaixa: number;
  gtin: string;
  gtinEmbalagem: string;
  tipoProducao: string;
  condicao: number;
  freteGratis: boolean;
  marca: string;
  descricaoComplementar: string;
  linkExterno: string;
  observacoes: string;
  descricaoEmbalagemDiscreta: string;
  source: string;
  price: number;
  precoCusto: number;
  precoCompra: number;
  promotion: boolean;
  link: string;
  search_id: string;
  saldoFisicoTotal: number;
  saldoVirtualTotal: number;
  saldoFisico: number;
  saldoVirtual: number;
  estoque: {
    minimo: number;
    maximo: number;
    crossdocking: number;
    localizacao: string;
  };
}

const Drafts = () => {
  const [drafts, setDrafts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deposits, setDeposits] = useState<any[]>([]);
  const [depositProducts, setDepositProducts] = useState<any[]>([]);
  const [selectedDeposit, setSelectedDeposit] = useState(null);
  const modalRef = useRef(null);
  const [situation, setSituation] = useState<string>("");

  const [draft, setDraft] = useState<Draft>({
    id: "",
    codigo: "",
    tipo: "P",
    situacao: "A",
    formato: "S",
    descricaoCurta: "",
    image_url: "",
    description: "",
    dataValidade: "",
    unidade: "UN",
    pesoLiquido: 0,
    pesoBruto: 0,
    volumes: 0,
    itensPorCaixa: 0,
    gtin: "",
    gtinEmbalagem: "",
    tipoProducao: "P",
    condicao: 0,
    freteGratis: false,
    marca: "",
    descricaoComplementar: "",
    linkExterno: "",
    observacoes: "",
    descricaoEmbalagemDiscreta: "",
    source: "",
    price: 0,
    precoCusto: 0,
    precoCompra: 0,
    promotion: false,
    link: "",
    search_id: "",
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

  const [product, setProduct] = useState({
    nome: "",
    codigo: "",
    preco: 0,
    tipo: "P",
    situacao: "A",
    formato: "S",
    image_url: "",
    descricaoCurta: "",
    dataValidade: "",
    unidade: "UN",
    pesoLiquido: 0,
    pesoBruto: 0,
    volumes: 0,
    itensPorCaixa: 0,
    gtin: "",
    gtinEmbalagem: "",
    tipoProducao: "P",
    condicao: 0,
    freteGratis: false,
    marca: "",
    descricaoComplementar: "",
    linkExterno: "",
    observacoes: "",
    descricaoEmbalagemDiscreta: "",
    estoque: {
      minimo: 0,
      maximo: 0,
      crossdocking: 0,
      localizacao: "",
    },
  });

  const getDrafts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetchDrafts();
      if (response && response.drafts) {
        setDrafts(response.drafts);
        console.log("Drafts fetched:", response.drafts);
      } else {
        setDrafts([]);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getDrafts();
  }, [getDrafts]);

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
    if (draft.id) {
      getDepositProductByProduct(Number(draft.id));
    }
  }, [draft.id, getDepositProductByProduct]); // Passa a função como dependência

  const handleEdit = async (id: string) => {
    console.log("Edit clicked for product:", id);
    try {
      const draft = await fetchDraft(id);
      setDraft({
        id: draft.id || "",
        codigo: draft.codigo || "",
        tipo: draft.tipo || "P",
        situacao: draft.situacao || "A",
        formato: draft.formato || "S",
        descricaoCurta: draft.descricaoCurta || "",
        image_url: draft.image_url || "",
        description: draft.description || "",
        dataValidade: draft.dataValidade || null,
        unidade: draft.unidade || "un",
        pesoLiquido: draft.pesoLiquido || 0,
        pesoBruto: draft.pesoBruto || 0,
        volumes: draft.volumes || 0,
        itensPorCaixa: draft.itensPorCaixa || 0,
        gtin: draft.gtin || "",
        gtinEmbalagem: draft.gtinEmbalagem || "",
        tipoProducao: draft.tipoProducao || "P",
        condicao: draft.condicao || 0,
        freteGratis: draft.fretegratis || false,
        marca: draft.marca || "",
        descricaoComplementar: draft.descricaoComplementar || "",
        linkExterno: draft.linkExterno || "",
        observacoes: draft.observacoes || "",
        descricaoEmbalagemDiscreta: draft.descricaoEmbalagemDiscreta || "",
        source: draft.source || "",
        price: draft.price || 0,
        precoCusto: draft.precoCusto || 0,
        precoCompra: draft.precoCompra || 0,
        promotion: draft.promotion || false,
        link: draft.link || "",
        search_id: draft.search_id || "",
        saldoFisicoTotal: draft.saldoFisicoTotal || 0,
        saldoVirtualTotal: draft.saldoVirtualTotal || 0,
        saldoFisico: draft.saldoFisico || 0,
        saldoVirtual: draft.saldoVirtual || 0,
        estoque: {
          minimo: draft.estoque?.minimo || 0,
          maximo: draft.estoque?.maximo || 0,
          crossdocking: draft.estoque?.crossdocking || 0,
          localizacao: draft.estoque?.localizacao || "",
        },
      });

      if (window.bootstrap && window.bootstrap.Modal) {
        const modal = new window.bootstrap.Modal(
          document.getElementById("modalProduct"),
        );
        modal.show();
      }
    } catch (error) {
      console.error("Erro ao buscar o rascunho do produto:", error);
    }
  };

  const handleSendToBling = async (id: string) => {
    console.log("Send clicked for product:", id);
    try {
      const draft = await fetchDraft(id);
      const product = {
        nome: draft.description,
        codigo: draft.codigo || "",
        preco: draft.price || 0,
        precoCusto: draft.precoCusto || 0,
        tipo: draft.tipo || "P",
        situacao: draft.situacao || "A",
        formato: draft.formato || "S",
        descricaoCurta: draft.descriptionCurta || "",
        image_url: draft.image_url || "",
        dataValidade: draft.Validade || "",
        unidade: draft.unidade || "UN",
        pesoLiquido: draft.pesoLiquido || 0,
        pesoBruto: draft.pesoBruto || 0,
        volumes: draft.volumes || 0,
        itensPorCaixa: draft.itensPorCaixa || 0,
        gtin: draft.gtin || "",
        gtinEmbalagem: draft.gtinEmbalagem || "",
        tipoProducao: draft.tipoProducao || "P",
        condicao: draft.condicao || 0,
        freteGratis: draft.freteGratis || false,
        marca: draft.marca || "",
        descricaoComplementar: draft.descricaoComplementar || "",
        linkExterno: draft.linkExterno || "",
        observacoes: draft.observacoes || "",
        descricaoEmbalagemDiscreta: draft.descricaoEmbalagemDiscreta || "",
        estoque: {
          minimo: draft.estoque?.minimo || 0,
          maximo: draft.estoque?.maximo || 0,
          crossdocking: draft.estoque?.crossdocking || 0,
          localizacao: draft.estoque?.localizacao || "",
        },
      };
      const success = await createProduct(product);
      console.log("Product sent to bling:", product);
      if (success) {
        toast.success("Produto enviado para o Bling com sucesso");
      } else {
        toast.error("Erro ao enviar produto para o Bling");
      }
    } catch (error) {
      console.error("Erro ao enviar produto para o Bling:", error);
    } finally {
      try {
        const deleteDraftSuccess = await deleteDraft(id);
        if (deleteDraftSuccess) {
          getDrafts();
          console.log("Draft deleted successfully");
        } else {
          console.error("Erro ao deletar o draft");
        }
      } catch (deleteError) {
        console.error("Erro ao deletar o draft:", deleteError);
      }
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
        handleDeleteProduct(id);
      }
    });
  };

  const confirmSendToBling = (id: string) => {
    Swal.fire({
      title: "Deseja realmente enviar para a Bling?",
      text: "Você não poderá reverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, enviar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        handleSendToBling(id);
      }
    });
  };

  const handleDeleteProduct = async (id: string) => {
    console.log("Delete result with ID:", id);
    try {
      const success = await deleteDraft(id);
      if (success) {
        toast.success("Item do Resultado da Busca deletado com sucesso");
        await getDrafts();
      } else {
        toast.error("Erro ao deletar o rascunho do produto");
      }
    } catch (error) {
      toast.error("Erro ao deletar o rascunho do produto");
      console.error("Erro ao deletar o rascunho do produto:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    // Verifica se o nome do campo é 'price' e converte o valor para número
    const newValue = name === "price" ? parseFloat(value) : value;

    console.log(`Field name: ${name}`);
    console.log(`Field value: ${value}`);
    console.log(`Converted value (if applicable): ${newValue}`);

    // Atualiza o estado draft com o novo valor
    setDraft((prevDraft) => ({
      ...prevDraft,
      [name]: newValue,
    }));
  };

  const handleSaveDraft = () => {
    handleUpdateDraft();
  };

  const handleUpdateDraft = async () => {
    try {
      // Certifique-se de que 'draft' contém todos os campos necessários
      console.log("Draft to update:", draft); // Adicione este log
      const draftToUpdate = {
        id: draft.id,
        codigo: draft.codigo,
        tipo: draft.tipo,
        situacao: draft.situacao,
        formato: draft.formato,
        descricaoCurta: draft.descricaoCurta,
        image_url: draft.image_url,
        description: draft.description,
        dataValidade: draft.dataValidade,
        pesoLiquido: draft.pesoLiquido,
        pesoBruto: draft.pesoBruto,
        volumes: Number(draft.volumes),
        itensPorCaixa: draft.itensPorCaixa,
        gtin: draft.gtin,
        gtinEmbalagem: draft.gtinEmbalagem,
        tipoProducao: draft.tipoProducao,
        condicao: draft.condicao,
        freteGratis: draft.freteGratis,
        marca: draft.marca,
        descricaoComplementar: draft.descricaoComplementar,
        linkExterno: draft.linkExterno,
        observacoes: draft.observacoes,
        descricaoEmbalagemDiscreta: draft.descricaoEmbalagemDiscreta,
        source: draft.source,
        price: draft.price,
        precoCusto: draft.precoCusto,
        precoCompra: draft.precoCompra,
        promotion: draft.promotion,
        link: draft.link,
        search_id: draft.search_id,
        estoque: {
          minimo: draft.estoque.minimo,
          maximo: draft.estoque.maximo,
          crossdocking: draft.estoque.crossdocking,
          localizacao: draft.estoque.localizacao,
        },
      };

      console.log("Draft to update (formatted):", draftToUpdate); // Adicione este log

      // Passa o draftToUpdate completo para a função updateDraft
      const success = await updateDraft(draftToUpdate);
      console.log("Update success:", success); // Verifica o resultado da atualização

      if (success) {
        console.log("Draft atualizado com sucesso");
        toast.success("Produto atualizado com sucesso");
        await getDrafts(); // Atualiza a lista de drafts
        const modalElement = document.getElementById("modalDraft");
        if (modalElement && window.bootstrap && window.bootstrap.Modal) {
          const modalInstance =
            window.bootstrap.Modal.getInstance(modalElement);
          if (modalInstance) {
            modalInstance.hide();
          } else {
            const newModalInstance = new window.bootstrap.Modal(modalElement);
            newModalInstance.hide();
          }
        }
      } else {
        toast.error("Erro ao atualizar o rascunho do produto");
      }
    } catch (error) {
      toast.error("Erro ao atualizar o rascunho do produto");
      console.error("Erro ao atualizar o rascunho do produto:", error);
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
                    Rasunho
                  </li>
                </ol>
              </nav>
              <h1 className="page-title mb-0 mt-2">
                Lista de rascunho de produtos
              </h1>
              <p className="lead">
                Visualizar rascunho de produtos cadastrados no sistema.
              </p>
            </div>
          </div>

          <div className="content__boxed">
            <div className="content__wrap">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="mb-3">
                    <h2>
                      Rasunho - <small>Estoque de itens</small>
                    </h2>
                    <p className="m-0">
                      Utilize as ferramentas de busca e filtro para encontrar
                      rascunho de produtos específicos e gerenciar os rascunho
                      de produtos de forma eficiente
                    </p>
                  </div>

                  <div className="row">
                    {loading ? (
                      <p>Carregando produtos...</p>
                    ) : (
                      <GridTableDrafts
                        data={drafts}
                        onEdit={handleEdit}
                        onDelete={confirmDelete}
                        onSendToBling={confirmSendToBling}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <DraftModal
          draft={draft}
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

export default Drafts;
