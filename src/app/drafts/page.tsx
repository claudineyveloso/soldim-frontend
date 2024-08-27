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

import { AuthWrapper } from "@/components/AuthWrapper";

import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import GridTableDrafts from "@/components/drafts/GridTable";
import DraftModal from "@/components/drafts/DraftModal";

interface Draft {
  codigo: string;
  nome: string;
  preco: number;
  unidade: string;
  tipo: string;
  situacao: string;
  condicao: number;
  formato: string;
}

const Drafts = () => {
  const [drafts, setDrafts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const modalRef = useRef(null);
  const [situation, setSituation] = useState<string>("");

  const [draft, setDraft] = useState<Draft>({
    codigo: "",
    nome: "",
    preco: 0,
    unidade: "",
    tipo: "",
    situacao: "A",
    condicao: 0,
    formato: "S",
  });
  const [product, setProduct] = useState({
    nome: "",
    codigo: "",
    preco: 0,
    tipo: "P",
    situacao: "A",
    formato: "S",
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

  const handleEdit = async (id: string) => {
    console.log("Edit clicked for product:", id);
    try {
      const draft = await fetchDraft(id);
      setDraft({
        codigo: draft.codigo || "",
        nome: draft.nome || "",
        preco: draft.preco || 0,
        unidade: draft.unidade || "",
        tipo: draft.tipo || "",
        situacao: draft.situacao || "",
        condicao: draft.condicao || 0,
        formato: draft.formato || "",
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

  const handleDeleteProduct = async (id: string) => {
    console.log("Delete result with ID:", id);
    try {
      const success = await deleteDraft(id);
      if (success) {
        toast.success("Item do Resultado da Busca deletado com sucesso");
        await getDrafts();
      } else {
        toast.error("Erro ao deletar resultado");
      }
    } catch (error) {
      toast.error("Erro ao deletar resultado da busca");
      console.error("Erro ao deletar resultado:", error);
    }
  };

  const handleNewProduct = () => {
    setNewProduct(true);
    setDraft({
      codigo: "",
      nome: "",
      preco: 0,
      unidade: "",
      tipo: "",
      situacao: "A",
      condicao: 0,
      formato: "S",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("estoque.")) {
      const field = name.split(".")[1];
      setProduct((prevProduct) => ({
        ...prevProduct,
        estoque: {
          ...prevProduct.estoque,
          [field]:
            field === "minimo" || field === "maximo" || field === "crossdocking"
              ? parseFloat(value)
              : value,
        },
      }));
    } else {
      setDraft((prevProduct) => ({
        ...prevProduct,
        [name]:
          name === "preco" || name === "condicao" ? parseFloat(value) : value,
      }));
    }
  };

  const handleSaveProduct = () => {
    handleUpdateDraft();
  };

  const handleUpdateDraft = async () => {
    try {
      const success = await updateDraft(draft);
      if (success) {
        toast.success("Produto atualizado com sucesso");
        await getDrafts();
        if (window.bootstrap && window.bootstrap.Modal) {
          const modal = new window.bootstrap.Modal(
            document.getElementById("modalProduct"),
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
                    Produtos
                  </li>
                </ol>
              </nav>
              <h1 className="page-title mb-0 mt-2">Lista de produtos</h1>
              <p className="lead">
                Visualizar produtos cadastrados no sistema.
              </p>
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

                  <div className="row">
                    <GridTableDrafts
                      data={drafts}
                      onEdit={handleEdit}
                      onDelete={confirmDelete}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <DraftModal
          draft={draft}
          onChange={handleChange}
          onSave={handleSaveProduct}
          modalRef={modalRef}
        />
      </AuthWrapper>
    </>
  );
};

export default Drafts;
