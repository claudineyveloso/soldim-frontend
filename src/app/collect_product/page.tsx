"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import Link from "next/link";
import {
  fetchSearchesResult,
  fetchSearchResult,
  deleteSearchResult,
  fetchSearchesResultSource,
} from "@/services/searchResultService";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import GridTableCollectProducts from "@/components/collect_product/GridTable";
import { createDraft } from "@/services/draftService";

interface FetchSearchesResultResponse {
  searchesResult: any[];
}

const CollectProduct = () => {
  const [collects, setCollects] = useState<any[]>([]);
  const [selectedSource, setSelectedSource] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const modalRef = useRef(null);
  const [editCollectId, setEditCollectId] = useState<number | null>(null);
  const [sources, setSources] = useState<any[]>([]);
  const [description, setDescription] = useState("Resultado");
  const [requestTime, setRequestTime] = useState<number | null>(null);
  const [lowestPriceProduct, setLowestPriceProduct] = useState<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteSearchResultId, setDeleteSearchResultId] = useState<string>("");
  const [draftSearchResultId, setDraftSearchResultId] = useState<string>("");
  const [descriptionNewSearchResult, setDescriptionNewSearchResult] =
    useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(searchTerm); // Chama handleSubmit passando a descrição
    }
  };

  useEffect(() => {
    const fetchSources = async () => {
      const fixedSearchID = "53282568-ffdb-47f1-89ac-ab5dba2a1c26";
      const result = await fetchSearchesResultSource(fixedSearchID);
      console.log("Fetched sources:", result);
      setSources(result);
    };

    fetchSources();
  }, []);

  const getCollects = useCallback(async (source: string = "") => {
    try {
      setLoading(true);
      const response = await fetchSearchesResult(source);
      setCollects(response.searchesResult);
    } catch (error) {
      console.error("Failed to fetch collect products:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getCollects(selectedSource);
  }, [getCollects, selectedSource]);

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
        deleteResult(id);
      }
    });
  };

  const deleteResult = async (id: string) => {
    console.log("Delete result with ID:", id);
    try {
      const success = await deleteSearchResult(id.toString());
      if (success) {
        toast.success("Item do Resultado da Busca deletado com sucesso");
        await getCollects(selectedSource);
      } else {
        toast.error("Erro ao deletar resultado");
      }
    } catch (error) {
      toast.error("Erro ao deletar resultado da busca");
      console.error("Erro ao deletar resultado:", error);
    }
  };

  const handleSourceChange = async (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedValue = event.target.value;
    setSelectedSource(selectedValue);
    console.log("Fonte selecionada:", selectedValue);

    try {
      const data: FetchSearchesResultResponse =
        await fetchSearchesResult(selectedValue);
      setCollects(data.searchesResult);
    } catch (error) {
      console.error("Erro ao buscar resultados da pesquisa:", error);
    }
  };

  const draftProduct = async (id: string) => {
    try {
      const searchResult = await fetchSearchResult(id.toString());
      if (!searchResult) {
        throw new Error("Resultado da pesquisa não encontrado");
      }

      const newDraft = {
        image_url: searchResult.image_url,
        description: searchResult.description,
        source: searchResult.source,
        price: searchResult.price,
        promotion: searchResult.promotion,
        link: searchResult.link,
        search_id: searchResult.search_id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const draftResponse = await createDraft(newDraft);
      if (draftResponse) {
        Swal.fire({
          icon: "success",
          title: "Rascunho criado com sucesso!",
          text: `O rascunho do produto foi criado com sucesso.`,
        });
      } else {
        console.error("Erro ao criar rascunho");
      }
    } catch (error) {
      console.error("Erro ao criar rascunho do produto:", error);
    }
  };

  const fetchProductsInWeb = (searchTerm: string) => {
    // Lógica para buscar produtos
    console.log("Searching for:", searchTerm);
  };

  const newSearch = (description: string) => {
    handleSubmit(description); // Chama handleSubmit passando a descrição
  };

  const handleSubmit = async (description: string) => {
    setDescription("Aguardando o resultado...");
    const startTime = new Date().getTime();
    fetchProductsInWeb(description);
    if (containerRef.current) {
      containerRef.current.classList.add("d-none");
    }
    try {
      const response = await axios.post("http://localhost:8080/create_search", {
        description,
      });

      if (response.data && Array.isArray(response.data)) {
        const productWithLowestPrice = response.data.reduce(
          (lowest, product) =>
            product.price < lowest.price ? product : lowest,
          response.data[0],
        );
        setLowestPriceProduct(productWithLowestPrice);
      }
    } catch (error) {
      console.error("Error creating search:", error);
    } finally {
      const endTime = new Date().getTime();
      const duration = (endTime - startTime) / 1000;
      setRequestTime(duration);
      setDescription("Resultado");
      if (containerRef.current) {
        containerRef.current.classList.remove("d-none");
      }
    }
  };

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const description = event.currentTarget.description.value; // ou a maneira como você obtém o valor da descrição
    handleSubmit(description);
  };

  return (
    <>
      <ToastContainer />
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
            <p className="lead">Visualizar produtos cadastrados no sistema.</p>
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

                <div className="justify-content-center">
                  <div className="flex-wrap align-items-center gap-2 mb-3 mb-sm-0">
                    <div className="row">
                      <div className="col-md-8 offset-md-2 mb-3">
                        <form
                          className="searchbox input-group"
                          onSubmit={onFormSubmit}
                        >
                          <input
                            className="searchbox__input form-control form-control-lg"
                            type="search"
                            placeholder="Localizar um produto na web..."
                            aria-label="Search"
                            value={searchTerm}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                          />
                          <div className="searchbox__btn-group">
                            <button
                              className="searchbox__btn btn btn-icon bg-transparent shadow-none border-0 btn-sm"
                              type="submit"
                            >
                              <i className="demo-pli-magnifi-glass"></i>
                            </button>
                          </div>
                        </form>

                        <div className="d-flex flex-wrap align-items-end justify-content-center gap-2 mt-3 pb-3">
                          <div className="d-md-flex flex-wrap align-items-center gap-2 mb-3 mb-sm-0">
                            <div className="text-center mb-2 mb-md-0">
                              Somente por fonte:
                            </div>
                            <select
                              className="form-select w-auto"
                              aria-label="Categories"
                              onChange={handleSourceChange}
                            >
                              <option value="">Todas</option>
                              {sources.map((source) => (
                                <option
                                  key={source.source}
                                  value={source.source}
                                >
                                  {source.source}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <GridTableCollectProducts
                    data={collects}
                    onNewSearch={newSearch}
                    onDraftProduct={draftProduct}
                    onDelete={confirmDelete}
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

export default CollectProduct;
