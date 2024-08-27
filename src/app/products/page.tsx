"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  fetchProducts,
  fetchProduct,
  deleteProduct,
  createProduct,
  updateProduct,
} from "@/services/productService";

import { AuthWrapper } from "@/components/AuthWrapper";

import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import GridTableProducts from "@/components/products/GridTable";
import ProductModal from "@/components/products/ProductModal";
import DetailModal from "@/components/products/DetailModal";

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [newProduct, setNewProduct] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const modalRef = useRef(null);
  // const [editProductId, setEditProductId] = useState<number | null>(null);
  const [situation, setSituation] = useState<string>("");
  //const [sources, setSources] = useState<any[]>([]);
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

  const getProducts = useCallback(
    async (nome: string = "", situacao: string = "") => {
      try {
        setLoading(true);
        const response = await fetchProducts(nome, situacao);
        if (response && response.products) {
          setProducts(response.products);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    getProducts("", situation);
  }, [getProducts, situation]);

  const handleCriterioChange = async (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const situacao = event.target.value;
    setSituation(situacao);
    const response = await fetchProducts("", situacao);
    setProducts(response.products);
    //getProducts("", situacao);
  };

  const handleDetails = async (id: number) => {
    console.log("Details clicked for product:", id);
    //const product = await fetchProduct(id);
    try {
      const product = await fetchProduct(id);

      setProduct({
        nome: product.nome || "",
        codigo: product.codigo || "",
        preco: product.preco || 0,
        tipo: product.tipo || "P",
        situacao: product.situacao || "A",
        formato: product.format || "S",
        descricaoCurta: product.descricaoCurta || "",
        dataValidade: product.dataValidade || "",
        unidade: product.unidade || "UN",
        pesoLiquido: product.pesoLiquido || 0,
        pesoBruto: product.pesoBruto || 0,
        volumes: product.volumes || 0,
        itensPorCaixa: product.itensPorCaixa || 0,
        gtin: product.gtin || "",
        gtinEmbalagem: product.gtinEmbalagem || "",
        tipoProducao: product.tipoProducao || "P",
        condicao: product.condicao || "P",
        freteGratis: product.freteGratis || false,
        marca: product.marca || "",
        descricaoComplementar: product.descricaoComplementar || "",
        linkExterno: product.linkExtorno || "",
        observacoes: product.observacoes || "",
        descricaoEmbalagemDiscreta: product.descricaoEmbalagemDiscreta || "",
        estoque: {
          minimo: product.estoque.minimo || 0,
          maximo: product.estoque.maximo || 0,
          crossdocking: product.estoque.crossdocking || 0,
          localizacao: product.estoque.localizacao || "",
        },
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

  const handleEdit = async (id: number) => {
    console.log("Edit clicked for product:", id);
    try {
      const product = await fetchProduct(id);
      setProduct({
        nome: product.nome || "",
        codigo: product.codigo || "",
        preco: product.preco || 0,
        tipo: product.tipo || "P",
        situacao: product.situacao || "A",
        formato: product.format || "S",
        descricaoCurta: product.descricaoCurta || "",
        dataValidade: product.dataValidade || "",
        unidade: product.unidade || "UN",
        pesoLiquido: product.pesoLiquido || 0,
        pesoBruto: product.pesoBruto || 0,
        volumes: product.volumes || 0,
        itensPorCaixa: product.itensPorCaixa || 0,
        gtin: product.gtin || "",
        gtinEmbalagem: product.gtinEmbalagem || "",
        tipoProducao: product.tipoProducao || "P",
        condicao: product.condicao || "P",
        freteGratis: product.freteGratis || false,
        marca: product.marca || "",
        descricaoComplementar: product.descricaoComplementar || "",
        linkExterno: product.linkExtorno || "",
        observacoes: product.observacoes || "",
        descricaoEmbalagemDiscreta: product.descricaoEmbalagemDiscreta || "",
        estoque: {
          minimo: product.estoque.minimo || 0,
          maximo: product.estoque.maximo || 0,
          crossdocking: product.estoque.crossdocking || 0,
          localizacao: product.estoque.localizacao || "",
        },
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

  const confirmDelete = (id: number) => {
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

  const handleDeleteProduct = async (id: number) => {
    console.log("Delete result with ID:", id);
    try {
      const success = await deleteProduct(id);
      if (success) {
        toast.success("Item do Resultado da Busca deletado com sucesso");
        await getProducts("", situation);
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
    setProduct({
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
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]:
          name === "preco" || name === "condicao" ? parseFloat(value) : value,
      }));
    }
  };

  const handleSaveProduct = () => {
    if (newProduct) {
      handleCreateProduct();
    } else {
      handleUpdateProduct();
    }
  };

  const handleCreateProduct = async () => {
    try {
      const success = await createProduct(product);
      if (success) {
        toast.success("Produto criado com sucesso");
        await getProducts("", situation);
        if (window.bootstrap && window.bootstrap.Modal) {
          const modal = new window.bootstrap.Modal(
            document.getElementById("modalProduct"),
          );
          modal.hide();
        }
      } else {
        toast.error("Erro ao criar produto");
      }
    } catch (error) {
      toast.error("Erro ao criar produto");
      console.error("Erro ao criar produto:", error);
    }
  };

  const handleUpdateProduct = async () => {
    try {
      const success = await updateProduct(product);
      if (success) {
        toast.success("Produto atualizado com sucesso");
        await getProducts("", situation);
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
                    <button
                      type="button"
                      className="btn btn-primary hstack gap-2 align-self-center"
                      data-bs-toggle="modal"
                      data-bs-target="#modalProduct"
                      onClick={handleNewProduct}
                    >
                      <i className="demo-psi-add fs-5" />
                      <span className="vr" />
                      Novo produto
                    </button>
                  </div>
                  <div className="row">
                    <GridTableProducts
                      data={products}
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
        <ProductModal
          product={product}
          onChange={handleChange}
          onSave={handleSaveProduct}
          modalRef={modalRef}
        />
        <DetailModal product={product} modalRef={modalRef} />
      </AuthWrapper>
    </>
  );
};

export default Products;
