"use client";
import React, { useState, useEffect, useRef } from "react";
import { Grid, h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import Link from "next/link";
import { fetchSearches } from "@/services/searchService";

const Searches = () => {
  const [searches, setSearches] = useState<any[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getSearches = async () => {
      try {
        const data = await fetchSearches();
        console.log("Fetched searches:", data); // Verifique os dados recebidos
        setSearches(data);
      } catch (error) {
        console.error("Failed to fetch searches:", error);
      }
    };

    getSearches();
  }, []);

  useEffect(() => {
    if (!searches || searches.length === 0 || !containerRef.current) return;

    const container = containerRef.current;

    // Limpar o contêiner antes de renderizar a tabela
    container.innerHTML = "";

    console.log("Rendering grid with searches:", searches);

    const grid = new Grid({
      className: {
        table: "table table-striped",
        thead: "thead-dark",
      },
      columns: [
        { name: "Descrição" },
        { name: "Criado em:", width: "100px" },
        {
          name: "Ações",
          width: "80px",
          formatter: (_, row) => {
            const searchIndex = row.cells[2].data as number; // Corrigido índice
            const searchId = searches[searchIndex].id;
            console.log("Search ID:", searchId); // Log do ID do usuário

            const editButton = h(
              "a",
              {
                herf: "#",
                className: "btn btn-icon btn-sm btn-hover btn-primary",
                onClick: () => {
                  console.log("Edit clicked for user:", searchId);
                  editSearch(searchId);
                },
              },
              h("i", { className: "demo-pli-list-view fs-5" }),
            );
            const deleteButton = h(
              "a",
              {
                herf: "#",
                className: "btn btn-icon btn-sm btn-hover btn-danger",
                onClick: () => {
                  console.log("Delete clicked for search:", searchId);
                  deleteSearch(searchId);
                },
              },
              h("i", { className: "demo-pli-trash fs-5" }),
            );
            return h("div", {}, [editButton, deleteButton]);
          },
        },
      ],
      sort: true,
      data: searches.map((search, index) => [
        search.description,
        new Date(search.created_at).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
        index, // Adiciona o índice do usuário como último campo
      ]),
    });

    grid.render(container);

    return () => {
      // Cleanup function to remove the grid instance
      grid.destroy();
    };
  }, [searches]);

  const editSearch = (id: string) => {
    console.log("Edit search with ID:", id);
    // Implementar lógica para editar usuário
  };

  const deleteSearch = (id: string) => {
    console.log("Delete search with ID:", id);
    // Implementar lógica para excluir usuário
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
                Pesquisas
              </li>
            </ol>
          </nav>
          <h1 className="page-title mb-0 mt-2">Lista de pesquisas recentes</h1>
          <p className="lead">
            Visualizar, adicionar, editar e excluir pesquisas cadastradas no
            sistema.
          </p>
        </div>
      </div>
      <div className="content__boxed">
        <div className="content__wrap">
          <div className="card mb-3">
            <div className="card-body">
              <div className="mb-3">
                <h2>Pesquisas recentes</h2>
                <p className="m-0">
                  Utilize as ferramentas de busca e filtro para encontrar
                  pesquisas específicas e gerenciar seus perfis de forma
                  eficiente
                </p>
                <p className="mt-2">
                  <i className="demo-psi-coding h4 mb-0 me-2"></i>
                  <a
                    className="btn-link text-decoration-underline"
                    href="https://github.com/olifolkerd/tabulator"
                    target="blank"
                  ></a>
                </p>
              </div>
              <hr />
              <h3 className="h4">Listagem</h3>
              <div id="_dm-gridjsSorting" ref={containerRef}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Searches;
