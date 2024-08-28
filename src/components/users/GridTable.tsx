import React, { useEffect, useRef } from "react";
import { Grid, h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";

interface GridTableUsersProps {
  data: any[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const mapUserType = (type: string) => {
  switch (type) {
    case "S":
      return "Super Admin";
    case "A":
      return "Admin";
    case "C":
      return "Colaborador";
    default:
      return "Desconhecido"; // Opcional, para lidar com casos inesperados
  }
};

const GridTableUsers: React.FC<GridTableUsersProps> = ({
  data,
  onEdit,
  onDelete,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);

  const handleEditRef = useRef(onEdit);
  const handleDeleteRef = useRef(onDelete);

  useEffect(() => {
    handleEditRef.current = onEdit;
    handleDeleteRef.current = onDelete;
  }, [onEdit, onDelete]);

  useEffect(() => {
    if (data.length === 0) return; // Não renderizar o grid se não houver dados

    // Limpar o contêiner do grid antes de renderizar um novo
    if (gridRef.current) {
      gridRef.current.innerHTML = "";
    }

    const grid = new Grid({
      columns: [
        { id: "email", name: "Email" },
        { id: "password", name: "Senha", width: "300px" },
        { id: "is_active", name: "Ativo", width: "100px" },
        { id: "user_type", name: "Tipo", width: "120px" },
        {
          id: "acoes",
          name: "Ações",
          width: "100px",
          formatter: (_, row) => {
            const userIndex = row.cells[4].data as number; // índice do produto na lista
            const userId = data[userIndex].id; // obtendo o ID do produto a partir do índice

            const editButton = h(
              "a",
              {
                href: "#",
                className: "btn btn-icon btn-sm btn-hover btn-primary",
                onClick: () => {
                  console.log("Edit clicked for product:", userId);
                  handleEditRef.current(userId);
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
                  console.log("Delete clicked for product:", userId);
                  handleDeleteRef.current(userId);
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
            data.map((user, index) => [
              user.email,
              user.password.replace(/./g, "*").substring(0, 20),
              user.is_active ? "Sim" : "Não",
              mapUserType(user.user_type),
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

export default React.memo(GridTableUsers);
