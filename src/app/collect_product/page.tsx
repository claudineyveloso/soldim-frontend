"use client";
import React, { useState, useEffect, useRef } from "react";
import { Grid, h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import Link from "next/link";
import { fetchSearchesResult } from "@/services/searchResultService";

const CollectProduct = () => {
  const [results, setResults] = useState<any[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
          name: "Imagem",
          width: "50px",
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
          width: "400px",
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
        { name: "Preço", width: "80px" },
        { name: "Promoção", width: "80px" },
        { name: "Criado em:", width: "80px" },
        { name: "Source", hidden: true }, // Coluna oculta para armazenar a fonte
        { name: "Link", hidden: true }, // Coluna oculta para armazenar o link
        { name: "ID", hidden: true }, // Coluna oculta para armazenar o ID
        {
          name: "Ações",
          width: "150px",
          formatter: (_, row) => {
            const resultId = row.cells[7] ? String(row.cells[7].data) : ""; // Converter resultId para string
            console.log("Result ID:", resultId); // Log do ID do usuário
            const deleteButton = h(
              "button",
              {
                className: "btn btn-sm btn-outline-danger",
                onClick: () => {
                  console.log("Delete clicked for result:", resultId);
                  deleteResult(resultId);
                },
              },
              "Deletar",
            );
            return h("div", {}, [deleteButton]);
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

  const deleteResult = (id: string) => {
    console.log("Delete result with ID:", id);
    // Implementar lógica para excluir resultado
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
                Coleta de Produtos
              </li>
            </ol>
          </nav>
          <h1 className="page-title mb-0 mt-2">Lista de coleta de produtos</h1>
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
                  coletas específicos e gerenciar seus perfis de forma eficiente
                </p>
              </div>
              <div className="row">
                <div className="col-md-6 d-flex gap-1 align-items-center justify-content-md-start mb-3">
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Localizar..."
                      className="form-control"
                      autoComplete="off"
                    />
                  </div>
                  <div className="col-md-4">
                    <select id="inputState" className="form-select">
                      <option selected>Selecione uma fonte...</option>
                      <option>State 1</option>
                      <option>State 2</option>
                      <option>State 3</option>
                    </select>
                  </div>
                </div>
              </div>

              <hr />
              <h3 className="h4">Resultado</h3>
              <div id="_dm-gridjsSorting" ref={containerRef}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectProduct;
