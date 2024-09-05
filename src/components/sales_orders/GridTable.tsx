import { useEffect, useRef } from "react";
import { Grid, h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";

interface GridTableSalesOrdersProps {
  data: any[];
  onDetails: (id: number) => void;
}

const GridTableSalesOrders: React.FC<GridTableSalesOrdersProps> = ({
  data,
  onDetails,
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
        { id: "descricao", name: "Descrição" },
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

            const detailsButton = h(
              "a",
              {
                href: "#",
                className: "btn btn-icon btn-sm btn-hover btn-warning",
                onClick: () => {
                  console.log("Edit clicked for product:", productId);
                  onDetails(productId);
                },
              },
              h("i", { className: "pli-spell-check fs-5" }),
            );

            return h("div", {}, [detailsButton]);
          },
        },
      ],
      data: () => {
        return new Promise((resolve) => {
          resolve(
            data.map((salesOrder, index) => [
              salesOrder.itens[0].descricao,
              salesOrder.numero,
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
  }, [data, onDetails]);

  return <div ref={gridRef} id="grid-wrapper" />;
};

export default GridTableSalesOrders;
