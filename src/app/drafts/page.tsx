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
  id: string;
  image_url: string;
  description: string;
  source: string;
  price: number;
  promotion: boolean;
  link: string;
  search_id: string;
}

const Drafts = () => {
  const [drafts, setDrafts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const modalRef = useRef(null);
  const [situation, setSituation] = useState<string>("");

  const [draft, setDraft] = useState<Draft>({
    id: "",
    image_url: "",
    description: "",
    source: "",
    price: 0,
    promotion: false,
    link: "",
    search_id: "",
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
        id: draft.id || "",
        image_url: draft.image_url || "",
        description: draft.description || "",
        source: draft.source || "",
        price: draft.price || 0,
        promotion: draft.promotion || false,
        link: draft.link || "",
        search_id: draft.search_id || "",
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
    setDraft({
      id: "",
      image_url: "",
      description: "",
      source: "",
      price: 0,
      promotion: false,
      link: "",
      search_id: "",
    });
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
    setDraft((prevDraft) => ({
      ...prevDraft,
      [name]: newValue,
    }));
  };

  const handleChangeFFF = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setDraft((prevDraft) => ({
      ...prevDraft,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  };

  const handleChangeXXX = (
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

  const handleSaveDraft = () => {
    handleUpdateDraft();
  };

  const handleUpdateDraft = async () => {
    try {
      // Certifique-se de que 'draft' contém todos os campos necessários
      console.log("Draft to update:", draft); // Adicione este log
      const draftToUpdate = {
        id: draft.id,
        image_url: draft.image_url,
        description: draft.description,
        source: draft.source,
        price: draft.price,
        promotion: draft.promotion,
        link: draft.link,
        search_id: draft.search_id,
      };

      console.log("Draft to update (formatted):", draftToUpdate); // Adicione este log

      // Passa o draftToUpdate completo para a função updateDraft
      const success = await updateDraft(draftToUpdate);

      if (success) {
        toast.success("Produto atualizado com sucesso");
        await getDrafts(); // Atualiza a lista de drafts
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

  const handleUpdateDraftXXX = async () => {
    try {
      const draftToUpdate = {
        ...draft,
        price: draft.price, // Convertendo o preço para string
      };

      const success = await updateDraft(draftToUpdate);
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
          onSave={handleSaveDraft}
          modalRef={modalRef}
        />
      </AuthWrapper>
    </>
  );
};

export default Drafts;
