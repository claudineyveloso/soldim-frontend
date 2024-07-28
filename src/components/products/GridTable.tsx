import React, { useEffect } from "react";
import { Grid, h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";

interface GridTableProductsProps {
  data: any[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const GridTableProducts: React.FC<GridTableProductsProps> = ({
  data,
  onEdit,
  onDelete,
}) => {
  useEffect(() => {
    if (data.length > 0) {
      new Grid({
        columns: [
          {
            name: "",
            width: "70px",
            formatter: (cell: string) =>
              h("img", {
                src: cell || "/assets/img/moldura.png", // Caminho da imagem padrão
                width: 30,
                height: 30,
              }),
          },
          { name: "Nome" },
          {
            name: "Codigo",
            width: "100px",
            formatter: (cell: string) =>
              cell
                ? cell
                : h("span", { className: "text-danger fw-bolder" }, "N/I"),
          },
          {
            name: "Preço",
            width: "100px",
            formatter: (cell: number) =>
              new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(cell),
          },
          {
            name: "Ações",
            width: "100px",
            formatter: (_, row) => {
              const productIndex = row.cells[4].data as number; // product index in the list
              const productId = data[productIndex].id; // getting product ID from index

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
        data: data.map((product, index) => [
          product.image_url,
          product.nome,
          product.codigo,
          product.preco,
          index, // índice
        ]),
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
      }).render(document.getElementById("grid-wrapper")!);
    }
  }, [data, onEdit, onDelete]);

  return <div id="grid-wrapper"></div>;
};

export default GridTableProducts;
