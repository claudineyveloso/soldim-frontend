"use client";
import React, { useState, useEffect, useRef } from "react";
import { Grid, h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import Link from "next/link";
import axios from "axios";
import { fetchDrafts } from "@/services/draftService";

const fetchProductsInWeb = (searchTerm: string) => {
  // Lógica para buscar produtos
  console.log("Searching for:", searchTerm);
};

const DraftProduct = () => {
  const [results, setResults] = useState<any[]>([]);
  const [description, setDescription] = useState("Resultado");
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [requestTime, setRequestTime] = useState<number | null>(null);
  const [lowestPriceProduct, setLowestPriceProduct] = useState<any>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const getDrafts = async () => {
    try {
      const data = await fetchDrafts();
      console.log("Fetched drafts result:", data); // Verifique os dados recebidos
      if (data && Array.isArray(data)) {
        setResults(data);
      } else {
        console.error("Unexpected data format:", data);
      }
    } catch (error) {
      console.error("Failed to fetch drafts:", error);
    }
  };

  useEffect(() => {
    getDrafts();
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
              h("i", { className: "demo-pli-pen-5 fs-5" }),
            );
            const deleteButton = h(
              "a",
              {
                href: "#",
                className: "btn btn-icon btn-sm btn-hover btn-danger",
                onClick: () => {
                  console.log("Delete clicked for result:", resultId);
                  deleteResult(resultId);
                },
              },
              h("i", { className: "demo-pli-trash fs-5" }),
            );
            return h("div", {}, [searchButton, deleteButton]);
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

  const deleteResult = (id: string) => {
    console.log("Delete result with ID:", id);
    // Implementar lógica para excluir resultado
  };

  const draftProduct = (id: string) => {
    console.log("Draft product with ID:", id);
    // Implementar lógica para rascunho de produto
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
      const response = await axios.post("http://localhost:8080/create_draft", {
        description: searchTerm,
      });
      console.log("Draft created:", response.data);

      await getDrafts(); // Atualizar os resultados após a criação da busca
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
    <section id="content" className="content">
      <div className="content__header content__boxed overlapping">
        <div className="content__wrap">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/dashboard">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Rascunhos de Produtos
              </li>
            </ol>
          </nav>
          <h1 className="page-title mb-0 mt-2">
            Lista de rascunho de produtos
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
                <h2>Rascunho de Produtos</h2>
                <p className="m-0">
                  Utilize as ferramentas de busca e filtro para encontrar
                  rascunhos específicos e gerenciar seus perfis de forma
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
                      placeholder="Localizar um rascunho..."
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

              <h3 className="h4">{description}</h3>
              <div id="_dm-gridjsSorting" ref={containerRef}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DraftProduct;
