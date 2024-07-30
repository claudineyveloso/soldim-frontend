import React, { useEffect, useRef } from "react";
import { Grid, h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";

interface GridTableCollectProductsProps {
  data: any[];
  onNewSearch: (desc: string) => void;
  onDraftProduct: (id: string) => void;
  onDelete: (id: string) => void;
}

const GridTableCollectProducts: React.FC<GridTableCollectProductsProps> = ({
  data,
  onNewSearch,
  onDraftProduct,
  onDelete,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data.length === 0) return;

    if (gridRef.current) {
      gridRef.current.innerHTML = "";
    }

    const grid = new Grid({
      columns: [
        {
          id: "Imagem",
          name: "",
          width: "80px",
          formatter: (cell: string) => {
            const imageUrl = cell ? cell : "/assets/img/moldura.png";
            return h("img", {
              src: imageUrl,
              width: 50,
              height: 50,
              onError: (e: any) => {
                e.target.src = "/assets/img/moldura.png";
              },
            });
          },
        },
        {
          id: "description",
          name: "Descrição",
          formatter: (cell: string, row: any) => {
            const source = row.cells[5]
              ? row.cells[5].data
              : "Fonte desconhecida";
            const link = row.cells[6] ? row.cells[6].data : "#";
            return h("div", {}, [
              h(
                "a",
                { href: link, target: "_blank", rel: "noopener noreferrer" },
                cell,
              ),
              h("br", {}),
              h("small", { className: "text-body-secondary" }, source),
            ]);
          },
        },
        {
          id: "preco",
          name: "Preço",
          width: "130px",
          formatter: (cell: number) =>
            new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(cell),
        },
        { id: "promotion", name: "Promoção", width: "130px" },
        {
          id: "created_at",
          name: "Criado em:",
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

        { id: "source", name: "Source", hidden: true },
        { id: "link", name: "Link", hidden: true },
        { id: "id", name: "ID", hidden: true },
        {
          id: "actions",
          name: "Ações",
          width: "150px",
          formatter: (_, row) => {
            const desc = row.cells[1] ? String(row.cells[1].data) : "";
            const resultId = row.cells[7] ? String(row.cells[7].data) : "";
            const searchButton = h(
              "a",
              {
                href: "#",
                className: "btn btn-icon btn-sm btn-hover bg-body-tertiary",
                onClick: () => {
                  console.log("Edit clicked for user:", desc);
                  onNewSearch(desc);
                },
              },
              h("i", { className: "demo-pli-magnifi-glass fs-5" }),
            );
            const draftButton = h(
              "a",
              {
                href: "#",
                className: "btn btn-icon btn-sm btn-hover btn-warning",
                onClick: () => {
                  console.log("Draft clicked for user:", resultId);
                  onDraftProduct(resultId);
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
                  onDelete(resultId);
                },
              },
              h("i", { className: "demo-pli-trash fs-5" }),
            );
            return h("div", {}, [searchButton, draftButton, deleteButton]);
          },
        },
      ],
      data: () => {
        return new Promise((resolve) => {
          resolve(
            data.map((collect) => [
              collect.image_url,
              collect.description,
              collect.price,
              collect.promotion,
              collect.created_at,
              collect.source,
              collect.link,
              collect.id,
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
          placeholder: "Pesquisar no resultado...",
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
  }, [data, onNewSearch, onDraftProduct, onDelete]);

  return <div ref={gridRef} id="grid-wrapper" />;
};

export default GridTableCollectProducts;
