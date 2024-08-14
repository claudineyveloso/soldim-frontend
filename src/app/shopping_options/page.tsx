"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  fetchProductsEmptyStock,
  fetchProduct,
  deleteProduct,
} from "@/services/productService";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import GridTableProductsEmptyStock from "@/components/products_empty_stock/GridTable";
import DetailModal from "@/components/products_empty_stock/DetailModal";

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [successMessage, setSuccessMessage] = useState("");
  const modalRef = useRef(null);
  const [editProductId, setEditProductId] = useState<number | null>(null);
  const [situation, setSituation] = useState<string>("");
  const [sources, setSources] = useState<any[]>([]);
  const [product, setProduct] = useState({
    id: 0,
    codigo: "",
    nome: "",
    preco: 0,
    unidade: "",
    tipo: "P",
    situacao: "A",
    condicao: 0,
    formato: "S",
    gtin: "",
    gtin_embalagem: "",
    saldo_fisico_total: 0,
    saldo_virtual_total: 0,
    saldo_fisico: 0,
    saldo_virtual: 0,
    minimo: 0,
    maximo: 0,
    crossdocking: 0,
    localizacao: "",
    preco_custo: 0,
    preco_venda: 0,
    marca: "",
  });

  const getProducts = useCallback(
    async (nome: string = "", situacao: string = "") => {
      try {
        setLoading(true);
        const response = await fetchProductsEmptyStock(nome, situacao);
        setProducts(response.products);
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
    const response = await fetchProductsEmptyStock("", situacao);
    setProducts(response.products);
    console.log("Situação:", response.products);
    //getProducts("", situacao);
  };

  const handleEdit = async (id: number) => {
    console.log("Edit clicked for product:", id);
    try {
      const product = await fetchProduct(id);
      setProduct({
        id: product.id || 0,
        codigo: product.codigo || "",
        nome: product.nome || "",
        preco: product.preco ? product.preco.toString() : "",
        unidade: product.unidade || "",
        tipo: product.tipo || "P",
        situacao: product.situacao || "A",
        condicao: product.condicao || "0",
        formato: product.formato || "S",
        gtin: product.gtin || "",
        gtin_embalagem: product.gtin_embalagem || "",
        saldo_fisico_total: product.saldo_fisico_total || 0,
        saldo_virtual_total: product.saldo_virtual_total || 0,
        saldo_fisico: product.saldo_fisico || 0,
        saldo_virtual: product.saldo_virtual || 0,
        minimo: product.minimo || 0,
        maximo: product.maximo || 0,
        crossdocking: product.crossdocking || 0,
        localizacao: product.localizacao || "",
        preco_custo: product.preco_custo || 0,
        preco_venda: product.preco_venda || 0,
        marca: product.marca || "",
      });

      if (window.bootstrap && window.bootstrap.Modal) {
        const modal = new window.bootstrap.Modal(
          document.getElementById("modalEmptyProduct"),
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

  const handleDetails = async (id: number) => {
    console.log("Details clicked for product:", id);
    const product = await fetchProduct(id);
    console.log("Product details:", product);
    try {
      const product = await fetchProduct(id);

      setProduct({
        id: product.id || 0,
        codigo: product.codigo || "",
        nome: product.nome || "",
        preco: product.preco || 0,
        unidade: product.unidade || "",
        tipo: product.tipo || "P",
        situacao: product.situacao || "A",
        condicao: product.condicao || 0,
        formato: product.formato || "S",
        gtin: product.gtin || "",
        gtin_embalagem: product.gtin_embalagem || "",
        saldo_fisico_total: product.saldo_fisico_total || 0,
        saldo_virtual_total: product.saldo_virtual_total || 0,
        saldo_fisico: product.saldo_fisico || 0,
        saldo_virtual: product.saldo_virtual || 0,
        minimo: product.minimo || 0,
        maximo: product.maximo || 0,
        crossdocking: product.crossdocking || 0,
        localizacao: product.localizacao || "",
        preco_custo: product.preco_custo || 0,
        preco_venda: product.preco_venda || 0,
        marca: product.marca || "",
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

  // const handleNewProduct = () => {
  //   setProduct({
  //     codigo: "",
  //     nome: "",
  //     preco: "",
  //     unidade: "",
  //     tipo: "P",
  //     situacao: "A",
  //     condicao: "0",
  //     formato: "S",
  //   });
  // };

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  // ) => {
  //   const { name, value } = e.target;
  //   console.log(`Field changed: ${name}, Value: ${value}`); // Log de depuração
  //   setProduct({
  //     ...product,
  //     [name]: value,
  //   });
  // };

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
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Produtos
                </li>
              </ol>
            </nav>
            <h1 className="page-title mb-0 mt-2">
              Lista de produtos sem estoque
            </h1>
            <p className="lead">
              Visualizar produtos sem estoque cadastrados no sistema.
            </p>
          </div>
        </div>

        <div className="content__boxed">
          <div className="content__wrap">
            <div className="card mb-3">
              <div className="card-body">
                <div className="mb-3">
                  <h2>
                    Produtos - <small>Sem Estoque</small>
                  </h2>
                  <p className="m-0">
                    Utilize as ferramentas de busca e filtro para encontrar
                    produtos sem estoque específicos e gerenciar os produtos sem
                    estoque de forma eficiente
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
                </div>
                <div className="row">
                  <GridTableProductsEmptyStock
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
      <DetailModal product={product} modalRef={modalRef} />
    </>
  );
};
export default Products;
