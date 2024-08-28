import React, { useEffect, useRef } from "react";
import { Grid, h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";

interface GridTableSearchesProps {
  data: any[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onDetails: (id: string) => void;
}

const GridTableSearches: React.FC<GridTableSearchesProps> = ({
  data,
  onEdit,
  onDelete,
  onDetails,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);

  const handleEditRef = useRef(onEdit);
  const handleDeleteRef = useRef(onDelete);
  const handleDetailsRef = useRef(onDetails);

  useEffect(() => {
    handleEditRef.current = onEdit;
    handleDeleteRef.current = onDelete;
    handleDetailsRef.current = onDetails;
  }, [onEdit, onDelete, onDetails]);

  useEffect(() => {
    if (data.length === 0) return; // Não renderizar o grid se não houver dados

    // Limpar o contêiner do grid antes de renderizar um novo
    if (gridRef.current) {
      gridRef.current.innerHTML = "";
    }

    const grid = new Grid({
      columns: [
        { id: "description", name: "Descrição" },
        {
          id: "created_at",
          name: "Criado em:",

          width: "110px",
          formatter: (cell: string) => {
            const date = new Date(cell);
            return date.toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            });
          },
        },
        {
          id: "acoes",
          name: "Ações",
          width: "110px",
          formatter: (_, row) => {
            const searchIndex = row.cells[2].data as number; // índice do produto na lista
            const searchId = data[searchIndex].id; // obtendo o ID do produto a partir do índice

            const editButton = h(
              "a",
              {
                href: "#",
                className: "btn btn-icon btn-sm btn-hover btn-primary",
                onClick: () => {
                  console.log("Edit clicked for search:", searchId);
                  handleEditRef.current(searchId);
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
                  console.log("Delete clicked for search:", searchId);
                  handleDeleteRef.current(searchId);
                },
              },
              h("i", { className: "demo-pli-trash fs-5" }),
            );

            const detailsButton = h(
              "a",
              {
                href: "#",
                className: "btn btn-icon btn-sm btn-hover btn-warning",
                onClick: () => {
                  console.log("Details clicked for search:", searchId);
                  handleDetailsRef.current(searchId);
                },
              },
              h("i", { className: "pli-spell-check fs-5" }),
            );

            return h("div", {}, [editButton, deleteButton, detailsButton]);
          },
        },
      ],
      data: () => {
        return new Promise((resolve) => {
          resolve(
            data.map((searchProduct, index) => [
              searchProduct.description,
              searchProduct.created_at,
              index, // índice
            ]),
          );
        });
      },
      search: true,
      pagination: {
        limit: 10,
      },
      sort: true,
      language: {
        search: {
          placeholder: "Pesquisar...",
        },
        pagination: {
          previous: "Anterior",
          next: "Próximo",
          showing: "Mostrando",
          results: () => "Resultados",
        },
      },
    });

    if (gridRef.current) {
      grid.render(gridRef.current);
    }

    return () => {
      grid.destroy();
    };
  }, [data]);

  return <div ref={gridRef} id="grid-wrapper" />;
};

export default GridTableSearches;
