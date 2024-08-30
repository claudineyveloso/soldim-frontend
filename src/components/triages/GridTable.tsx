import React, { useEffect, useRef } from "react";
import { Grid, h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";

interface GridTableTriagesProps {
  data: any[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onDetails: (id: string) => void;
}

const GridTableTriages: React.FC<GridTableTriagesProps> = ({
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
        { id: "nome", name: "Nome" },
        {
          id: "codigo",
          name: "Codigo",
          width: "120px",
          formatter: (cell: string) =>
            cell
              ? cell
              : h("span", { className: "text-danger fw-bolder" }, "N/I"),
        },
        {
          id: "preco",
          name: "Preço",
          width: "120px",
          formatter: (cell: number) =>
            new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(cell),
        },
        {
          id: "acoes",
          name: "Ações",
          width: "140px",
          formatter: (_, row) => {
            const triageIndex = row.cells[3].data as number; // índice do produto na lista
            const triageId = data[triageIndex].id; // obtendo o ID do produto a partir do índice

            const editButton = h(
              "a",
              {
                href: "#",
                className: "btn btn-icon btn-sm btn-hover btn-primary",
                onClick: () => {
                  console.log("Edit clicked for product:", triageId);
                  handleEditRef.current(triageId);
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
                  console.log("Delete clicked for product:", triageId);
                  handleDeleteRef.current(triageId);
                },
              },
              h("i", { className: "demo-pli-trash fs-5" }),
            );

            const detailsButton = h(
              "a",
              {
                href: "#",
                className: "btn btn-icon btn-sm btn-hover btn-danger",
                onClick: () => {
                  console.log("Details clicked for product:", triageId);
                  handleDetailsRef.current(triageId);
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
            data.map((triage, index) => [
              triage.description,
              triage.sku_wms,
              triage.unitary_value,
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

export default GridTableTriages;
