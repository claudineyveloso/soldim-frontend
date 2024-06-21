"use client";
import React, { useState, useEffect, useRef } from "react";
import { Grid, h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import Link from "next/link";
import { fetchUsers } from "@/services/userService";

const Users = () => {
  const [users, setUsers] = useState<any[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        console.log("Fetched users:", data); // Verifique os dados recebidos
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    getUsers();
  }, []);

  useEffect(() => {
    if (users.length === 0 || !containerRef.current) return;

    const container = containerRef.current;

    // Limpar o contêiner antes de renderizar a tabela
    container.innerHTML = "";

    console.log("Rendering grid with users:", users);

    const grid = new Grid({
      className: {
        table: "table table-striped",
        thead: "thead-dark",
      },
      columns: [
        { name: "Email", width: "200px" },
        { name: "Ativo", width: "100px" },
        { name: "Tipo", width: "150px" },
        { name: "Criado em:", width: "120px" },
        {
          name: "Ações",
          width: "150px",
          formatter: (_, row) => {
            const userIndex = row.cells[4].data as number; // Acessar o índice correto
            const userId = users[userIndex].id;
            console.log("User ID:", userId); // Log do ID do usuário

            const editButton = h(
              "button",
              {
                className: "btn btn-sm btn-outline-primary me-2",
                onClick: () => {
                  console.log("Edit clicked for user:", userId);
                  editUser(userId);
                },
              },
              "Editar",
            );
            const deleteButton = h(
              "button",
              {
                className: "btn btn-sm btn-outline-danger",
                onClick: () => {
                  console.log("Delete clicked for user:", userId);
                  deleteUser(userId);
                },
              },
              "Deletar",
            );
            return h("div", {}, [editButton, deleteButton]);
          },
        },
      ],
      sort: true,
      data: users.map((user, index) => [
        user.email,
        user.is_active ? "Yes" : "No",
        user.user_type,
        new Date(user.created_at).toLocaleDateString("pt-BR", {
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
  }, [users]);

  const editUser = (id: number) => {
    console.log("Edit user with ID:", id);
    // Implementar lógica para editar usuário
  };

  const deleteUser = (id: number) => {
    console.log("Delete user with ID:", id);
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
                Usuários
              </li>
            </ol>
          </nav>
          <h1 className="page-title mb-0 mt-2">Lista de usuários</h1>
          <p className="lead">
            Visualizar, adicionar, editar e excluir usuários cadastrados no
            sistema.
          </p>
        </div>
      </div>
      <div className="content__boxed">
        <div className="content__wrap">
          <div className="card mb-3">
            <div className="card-body">
              <div className="mb-3">
                <h2>Usuários</h2>
                <p className="m-0">
                  Utilize as ferramentas de busca e filtro para encontrar
                  usuários específicos e gerenciar seus perfis de forma
                  eficiente
                </p>
              </div>
              <div className="row">
                <div className="col-md-6 d-flex gap-1 align-items-center justify-content-md-start mb-3">
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Localizar..."
                      className="form-control"
                      autoComplete="off"
                    />
                  </div>
                  <div className="btn-group">
                    <button className="btn btn-icon btn-outline-light">
                      <i className="demo-pli-download-from-cloud fs-5"></i>
                    </button>
                    <button
                      className="btn btn-icon btn-outline-light dropdown-toggle dropdown-toggle-split"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span className="visually-hidden">Toggle Dropdown</span>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <a className="dropdown-item" href="#">
                          Action
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Another action
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Something else here
                        </a>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Separated link
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-md-6 d-flex gap-1 justify-content-md-end align-items-center mb-3">
                  <button className="btn btn-primary hstack gap-2 align-self-center">
                    <i className="demo-psi-add fs-5"></i>
                    <span className="vr"></span>
                    Novo usuário
                  </button>
                </div>
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

export default Users;
