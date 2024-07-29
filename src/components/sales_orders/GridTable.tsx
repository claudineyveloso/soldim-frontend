import React, { useEffect, useRef } from "react";
import { Grid, h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";

interface GridTableSalesOrdersProps {
  data: any[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const GridTableSalesOrders: React.FC<GridTableSalesOrdersProps> = ({
  data,
  onEdit,
  onDelete,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);

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
          id: "data_saida",
          name: "Data Saída",
          width: "150px",
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
          width: "120px",
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
                  onEdit(productId);
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
                  onDelete(productId);
                },
              },
              h("i", { className: "demo-pli-trash fs-5" }),
            );

            return h("div", {}, [editButton, deleteButton]);
          },
        },
      ],
      data: () => {
        return new Promise((resolve) => {
          resolve(
            data.map((salesOrder, index) => [
              salesOrder.nome,
              salesOrder.codigo,
              salesOrder.totalprodutos,
              salesOrder.datasaida,
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
  }, [data, onEdit, onDelete]);

  return <div ref={gridRef} id="grid-wrapper" />;
};

export default GridTableSalesOrders;
