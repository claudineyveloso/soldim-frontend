"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { AuthWrapper } from "@/components/AuthWrapper";
import {
  fetchProductsEmptyStock,
  fetchProduct,
  deleteProduct,
} from "@/services/productService";

import { fetchDeposits } from "@/services/depositService";
import { fetchDepositProductByProduct } from "@/services/depositProductService";

import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import GridTableProductsEmptyStock from "@/components/products_empty_stock/GridTable";
import ProductModal from "@/components/products_empty_stock/ProductModal";
import DetailModal from "@/components/products_empty_stock/DetailModal";

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deposits, setDeposits] = useState<any[]>([]);
  const [depositProducts, setDepositProducts] = useState<any[]>([]);
  const [selectedDeposit, setSelectedDeposit] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const modalRef = useRef(null);
  const [editProductId, setEditProductId] = useState<number | null>(null);
  const [situation, setSituation] = useState<string>("");
  const [sources, setSources] = useState<any[]>([]);
  const [product, setProduct] = useState({
    id: 0,
    nome: "",
    codigo: "",
    preco: 0,
    precoCusto: 0,
    precoCompra: 0,
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

  const getProducts = useCallback(
    async (nome: string = "", situacao: string = "") => {
      try {
        setLoading(true);
        const response = await fetchProductsEmptyStock(nome, situacao);
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
    if (product.id) {
      getDepositProductByProduct(product.id);
    }
  }, [product.id, getDepositProductByProduct]); // Passa a função como dependência

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
        nome: product.nome || "",
        codigo: product.codigo || "",
        preco: product.preco || 0,
        precoCusto: product.precoCusto || 0,
        precoCompra: product.preco_compra || 0,
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
        condicao: product.condicao || 0,
        freteGratis: product.freteGratis || false,
        marca: product.marca || "",
        descricaoComplementar: product.descricaoComplementar || "",
        linkExterno: product.linkExtorno || "",
        observacoes: product.observacoes || "",
        descricaoEmbalagemDiscreta: product.descricaoEmbalagemDiscreta || "",
        saldoFisicoTotal: product.saldo_fisico_total || 0,
        saldoVirtualTotal: product.saldo_virtual_total || 0,
        saldoFisico: product.saldo_fisico || 0,
        saldoVirtual: product.saldo_virtual || 0,
        estoque: {
          minimo: product.estoque?.minimo || 0,
          maximo: product.estoque?.maximo || 0,
          crossdocking: product.estoque?.crossdocking || 0,
          localizacao: product.estoque?.localizacao || "",
        },
      });

      if (window.bootstrap && window.bootstrap.Modal) {
        const modal = new window.bootstrap.Modal(
          document.getElementById("modalEmptyProduct"),
        );
        modal.show();
      }
    } catch (error) {
      console.error("Erro ao buscar produto estoque vazio:", error);
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
        id: product.id,
        nome: product.nome || "",
        codigo: product.codigo || "",
        preco: product.preco || 0,
        precoCusto: product.precoCusto || 0,
        precoCompra: product.preco_compra || 0,
        tipo: product.tipo || "P",
        situacao: product.situacao || "A",
        formato: product.format || "S",
        descricaoCurta: product.descricaoCurta || "",
        dataValidade: product.dataValidade || null,
        unidade: product.unidade || "UN",
        pesoLiquido: product.pesoLiquido || 0,
        pesoBruto: product.pesoBruto || 0,
        volumes: product.volumes || 0,
        itensPorCaixa: product.itensPorCaixa || 0,
        gtin: product.gtin || "",
        gtinEmbalagem: product.gtinEmbalagem || "",
        tipoProducao: product.tipoProducao || "P",
        condicao: product.condicao || 0,
        freteGratis: product.freteGratis || false,
        marca: product.marca || "",
        descricaoComplementar: product.descricaoComplementar || "",
        linkExterno: product.linkExtorno || "",
        observacoes: product.observacoes || "",
        descricaoEmbalagemDiscreta: product.descricaoEmbalagemDiscreta || "",
        saldoFisicoTotal: product.saldo_fisico_total || 0,
        saldoVirtualTotal: product.saldo_virtual_total || 0,
        saldoFisico: product.saldo_fisico || 0,
        saldoVirtual: product.saldo_virtual || 0,
        estoque: {
          minimo: product.estoque?.minimo || 0,
          maximo: product.estoque?.maximo || 0,
          crossdocking: product.estoque?.crossdocking || 0,
          localizacao: product.estoque?.localizacao || "",
        },
      });

      if (window.bootstrap && window.bootstrap.Modal) {
        const modal = new window.bootstrap.Modal(
          document.getElementById("modalDetailProduct"),
        );
        modal.show();
      }
    } catch (error) {
      console.error("Erro ao buscar produto estoque vazio:", error);
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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    console.log(`Field changed: ${name}, Value: ${value}`); // Log de depuração
    setProduct({
      ...product,
      [name]:
        name === "preco" || name === "condicao" ? parseFloat(value) : value,
    });
  };

  const handleSaveProduct = () => {
    console.log("Salvar produto:", product);
    // Adicione a lógica para salvar o produto
    // Depois de salvar, feche o modal e atualize a lista de produtos
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
                      produtos sem estoque específicos e gerenciar os produtos
                      sem estoque de forma eficiente
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
                    {loading ? (
                      <p>Carregando produtos...</p>
                    ) : (
                      <GridTableProductsEmptyStock
                        data={products}
                        onEdit={handleEdit}
                        onDelete={confirmDelete}
                        onDetails={handleDetails}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <ProductModal
          product={product}
          onChange={handleChange}
          deposits={deposits}
          defaultDeposit={selectedDeposit}
          onSave={handleSaveProduct}
          modalRef={modalRef}
        />
        <DetailModal
          product={product}
          depositProduct={depositProducts}
          modalRef={modalRef}
        />
      </AuthWrapper>
    </>
  );
};
export default Products;
