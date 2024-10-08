import React, { useEffect, useRef } from "react";
import { Grid, h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";

interface GridTableDraftsProps {
  data: any[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onSendToBling: (id: string) => void;
}

const GridTableDrafts: React.FC<GridTableDraftsProps> = ({
  data,
  onEdit,
  onDelete,
  onSendToBling,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);

  const handleEditRef = useRef(onEdit);
  const handleDeleteRef = useRef(onDelete);
  const handleSendToBlingRef = useRef(onSendToBling);

  useEffect(() => {
    handleEditRef.current = onEdit;
    handleDeleteRef.current = onDelete;
    handleSendToBlingRef.current = onSendToBling;
  }, [onEdit, onDelete, onSendToBling]);

  useEffect(() => {
    if (data.length === 0) return; // Não renderizar o grid se não houver dados

    // Limpar o contêiner do grid antes de renderizar um novo
    if (gridRef.current) {
      gridRef.current.innerHTML = "";
    }

    const grid = new Grid({
      columns: [
        {
          id: "image",
          name: "",
          width: "70px",
          formatter: (cell: string) =>
            h("img", {
              src: cell || "/assets/img/moldura.png", // Caminho da imagem padrão
              width: 30,
              height: 30,
            }),
        },
        { id: "nome", name: "Nome" },
        {
          id: "codigo",
          name: "Codigo",
          width: "100px",
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
          width: "130px",
          formatter: (_, row) => {
            const draftIndex = row.cells[4].data as number; // índice do rascunho na lista
            const draftId = data[draftIndex].id; // obtendo o ID do rascunho a partir do índice

            const editButton = h(
              "a",
              {
                href: "#",
                className: "btn btn-icon btn-sm btn-hover btn-primary",
                onClick: () => {
                  console.log("Edit clicked for draft:", draftId);
                  handleEditRef.current(draftId);
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
                  console.log("Delete clicked for draft:", draftId);
                  handleDeleteRef.current(draftId);
                },
              },
              h("i", { className: "demo-pli-trash fs-5" }),
            );
            const sendToBlingButton = h(
              "a",
              {
                href: "#",
                className: "btn btn-icon btn-sm btn-hover btn-success",
                onClick: () => {
                  console.log("Send clicked for draft:", draftId);
                  handleSendToBlingRef.current(draftId);
                },
              },
              h("i", { className: "demo-pli-share fs-5" }),
            );

            return h("div", {}, [editButton, deleteButton, sendToBlingButton]);
          },
        },
      ],
      data: () => {
        return new Promise((resolve) => {
          resolve(
            data.map((draft, index) => [
              draft.image_url,
              draft.description,
              draft.promotion,
              draft.price,
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

export default GridTableDrafts;
