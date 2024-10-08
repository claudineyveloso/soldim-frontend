import React, { useEffect, useRef, useCallback } from "react";
import { Grid, h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";

interface GridTableProductsProps {
  data: any[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onDetails: (id: number) => void;
}

const GridTableProducts: React.FC<GridTableProductsProps> = ({
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
            const productIndex = row.cells[4].data as number; // índice do produto na lista
            const productId = data[productIndex].id; // obtendo o ID do produto a partir do índice

            const editButton = h(
              "a",
              {
                href: "#",
                className: "btn btn-icon btn-sm btn-hover btn-primary",
                onClick: () => {
                  console.log("Edit clicked for product:", productId);
                  handleEditRef.current(productId);
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
                  console.log("Delete clicked for product:", productId);
                  handleDeleteRef.current(productId);
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
                  console.log("Details clicked for product:", productId);
                  handleDetailsRef.current(productId);
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
            data.map((product, index) => [
              product.image_url,
              product.nome,
              product.codigo,
              product.preco,
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

export default GridTableProducts;
