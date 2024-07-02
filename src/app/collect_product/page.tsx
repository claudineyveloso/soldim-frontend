"use client";
import React, { useState, useEffect, useRef } from "react";
import { Grid, h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import Link from "next/link";
import axios from "axios";
import {
  fetchSearchesResult,
  fetchSearchResult,
  deleteSearchResult,
} from "@/services/searchResultService";
import { createDraft } from "@/services/draftService";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Swal from "sweetalert2";

const fetchProductsInWeb = (searchTerm: string) => {
  // Lógica para buscar produtos
  console.log("Searching for:", searchTerm);
};

const CollectProduct = () => {
  const [results, setResults] = useState<any[]>([]);
  const [description, setDescription] = useState("Resultado");
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [requestTime, setRequestTime] = useState<number | null>(null);
  const [lowestPriceProduct, setLowestPriceProduct] = useState<any>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const getResults = async () => {
    try {
      const data = await fetchSearchesResult();
      console.log("Fetched searches result:", data); // Verifique os dados recebidos
      if (data && Array.isArray(data)) {
        setResults(data);
      } else {
        console.error("Unexpected data format:", data);
      }
    } catch (error) {
      console.error("Failed to fetch searches result:", error);
    }
  };

  useEffect(() => {
    getResults();
  }, []);

  useEffect(() => {
    if (results.length === 0 || !containerRef.current) return;

    const container = containerRef.current;

    // Limpar o contêiner antes de renderizar a tabela
    container.innerHTML = "";

    console.log("Rendering grid with results:", results);

    const grid = new Grid({
      className: {
        table: "table table-striped",
        thead: "thead-dark",
      },
      columns: [
        {
          name: "",
          width: "80px",
          formatter: (cell: string) => {
            const imageUrl = cell ? cell : "/assets/img/moldura.png"; // Usar a URL da imagem ou a imagem padrão
            return h("img", {
              src: imageUrl,
              width: 50,
              height: 50,
              onError: (e: any) => {
                e.target.src = "/assets/img/moldura.png";
              }, // Fallback se a imagem falhar
            });
          },
        },
        {
          name: "Descrição",
          formatter: (cell: string, row: any) => {
            console.log("Row data:", row.cells); // Verifique todos os dados da linha
            const source = row.cells[5]
              ? row.cells[5].data
              : "Fonte desconhecida"; // Verifique se row.cells[5] existe
            const link = row.cells[6] ? row.cells[6].data : "#"; // Verifique se row.cells[6] existe para o link
            return h("div", {}, [
              h(
                "a",
                { href: link, target: "_blank", rel: "noopener noreferrer" },
                cell,
              ),
              h("br", {}),
              h("small", { className: "text-body-secondary" }, source), // Adicionar o campo source
            ]);
          },
        },
        { name: "Preço", width: "100px" },
        { name: "Promoção", width: "120px" },
        { name: "Criado em:", width: "120px" },
        { name: "Source", hidden: true }, // Coluna oculta para armazenar a fonte
        { name: "Link", hidden: true }, // Coluna oculta para armazenar o link
        { name: "ID", hidden: true }, // Coluna oculta para armazenar o ID
        {
          name: "Ações",
          width: "130px",
          formatter: (_, row) => {
            const desc = row.cells[1] ? String(row.cells[1].data) : ""; // Converter descrição para string
            const resultId = row.cells[7] ? String(row.cells[7].data) : ""; // Converter resultId para string
            console.log("Result ID:", resultId); // Log do ID do usuário
            const searchButton = h(
              "a",
              {
                herf: "#",
                className: "btn btn-icon btn-sm btn-hover bg-body-tertiary",
                onClick: () => {
                  console.log("Edit clicked for user:", desc);
                  newSearch(desc);
                },
              },
              h("i", { className: "demo-pli-magnifi-glass fs-5" }),
            );
            const draftButton = h(
              "a",
              {
                herf: "#",
                className: "btn btn-icon btn-sm btn-hover btn-warning",
                onClick: () => {
                  console.log("Edit clicked for user:", desc);
                  draftProduct(resultId);
                },
              },
              h("i", { className: "demo-pli-file-edit fs-5" }),
            );

            const deleteButton = h(
              "a",
              {
                href: "#",
                className: "btn btn-icon btn-sm btn-hover btn-danger",
                onClick: () => {
                  console.log("Delete clicked for result:", resultId);
                  confirmDelete(resultId);
                },
              },
              h("i", { className: "demo-pli-trash fs-5" }),
            );
            return h("div", {}, [searchButton, draftButton, deleteButton]);
          },
        },
      ],
      sort: true,
      data: results.map((result) => {
        console.log("Result data:", result);
        return [
          result.image_url ? String(result.image_url) : "", // Garantir que todos os valores sejam strings
          result.description ? String(result.description) : "",
          result.price !== undefined
            ? result.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })
            : "",
          result.promotion !== undefined
            ? result.promotion
              ? "Sim"
              : "Não"
            : "",
          result.created_at
            ? new Date(result.created_at).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
            : "",
          result.source ? String(result.source) : "",
          result.link ? String(result.link) : "#", // Adicionar o link
          result.id ? String(result.id) : "", // Adicionar o ID do usuário como string
        ];
      }),
    });

    grid.render(container);

    return () => {
      // Cleanup function to remove the grid instance
      grid.destroy();
    };
  }, [results]);

  const newSearch = (description: string) => {
    console.log("search with the description:", description);
    // Implementar lógica para editar
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
        deleteResult(id);
      }
    });
  };

  const deleteResult = async (id: string) => {
    console.log("Delete result with ID:", id);
    // Implementar lógica para excluir resultados

    try {
      const success = await deleteSearchResult(id);
      if (success) {
        toast.success("Item do Resultado da Busca deletado com sucesso");
        // Atualizar a lista de resultados após a exclusão
        await getResults();
      } else {
        toast.error("Erro ao deletar resultado");
      }
    } catch (error) {
      toast.error("Erro ao deletar resultado da busca");
      console.error("Erro ao deletar resultado:", error);
    }
  };

  const draftProduct = async (id: string) => {
    console.log("Draft product with ID:", id);
    // Implementar lógica para rascunho de produto
    try {
      // Fetch the search result by ID
      const searchResult = await fetchSearchResult(id);
      if (!searchResult) {
        throw new Error("Resultado da pesquisa não encontrado");
      }

      // Create a draft using the fetched search result data
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
        console.log("Rascunho criado com sucesso:", draftResponse);
        Swal.fire({
          title: "Sucesso!",
          text: "Rascunho criado com sucesso",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        console.error("Erro ao criar rascunho");
        Swal.fire({
          title: "Erro!",
          text: "Erro ao criar rascunho",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Erro ao criar rascunho do produto:", error);
      Swal.fire({
        title: "Erro!",
        text: "Erro ao criar rascunho do produto",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDescription("Aguardando o resultado...");
    const startTime = new Date().getTime();
    fetchProductsInWeb(searchTerm);
    if (containerRef.current) {
      containerRef.current.classList.add("d-none");
    }

    // Chamar a API para criar a busca
    try {
      const response = await axios.post("http://localhost:8080/create_search", {
        description: searchTerm,
      });
      console.log("Search created:", response.data);

      if (response.data && Array.isArray(response.data)) {
        const productWithLowestPrice = response.data.reduce(
          (lowest, product) => {
            console.log("Comparing products:", lowest, product); // Log de comparação
            return product.price < lowest.price ? product : lowest;
          },
          response.data[0],
        );
        console.log(
          "***********************************************************************",
        );
        console.log("Product with lowest price:", productWithLowestPrice); // Log do produto com menor preço
        console.log(
          "***********************************************************************",
        );
        setLowestPriceProduct(productWithLowestPrice);
      }

      await getResults(); // Atualizar os resultados após a criação da busca
    } catch (error) {
      console.error("Error creating search:", error);
    } finally {
      const endTime = new Date().getTime(); // Marca o fim do tempo
      const duration = (endTime - startTime) / 1000; // Calcula a duração em segundos
      setRequestTime(duration);
      setDescription("Resultado");
      if (containerRef.current) {
        containerRef.current.classList.remove("d-none");
      }
    }
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
                  Coleta de Produtos
                </li>
              </ol>
            </nav>
            <h1 className="page-title mb-0 mt-2">
              Lista de coleta de produtos
            </h1>
            <p className="lead">
              Visualizar, adicionar, editar e excluir coletas cadastrados no
              sistema.
            </p>
          </div>
        </div>
        <div className="content__boxed">
          <div className="content__wrap">
            <div className="card mb-3">
              <div className="card-body">
                <div className="mb-3">
                  <h2>Coleta de Produtos</h2>
                  <p className="m-0">
                    Utilize as ferramentas de busca e filtro para encontrar
                    coletas específicos e gerenciar seus perfis de forma
                    eficiente
                  </p>
                </div>
                <div className="row">
                  <div className="col-md-8 offset-md-2 mb-3">
                    <form
                      className="searchbox input-group"
                      onSubmit={handleSubmit}
                    >
                      <input
                        className="searchbox__input form-control form-control-lg"
                        type="search"
                        placeholder="Localizar um produto..."
                        aria-label="Search"
                        value={searchTerm}
                        onChange={handleChange}
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
                  </div>
                </div>

                <div className="pb-3 mb-5 border-bottom">
                  <h2 className="mb-2">
                    <span className="text-nowrap">
                      179 resultados encontrados para o produto:{" "}
                    </span>
                    <i className="text-info-emphasis text-normal">
                      Dashboard Theme
                    </i>
                  </h2>
                  <small>Tempo de solicitação ({requestTime} segundos)</small>
                </div>
                <hr />
                <h3 className="h4">{description}</h3>
                <div id="_dm-gridjsSorting" ref={containerRef}></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CollectProduct;
