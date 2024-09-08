"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { AuthWrapper } from "@/components/AuthWrapper";
import { fetchUsers, fetchUser, createUser } from "@/services/userService";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import GridTableUsers from "@/components/users/GridTable";
import UserModal from "@/components/users/UserModal";

type UserType = "S" | "A" | "C";

interface UserState {
  id: number;
  email: string;
  password: string;
  is_active: boolean;
  user_type: UserType;
}

const Users = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const modalRef = useRef(null);
  const [user, setUser] = useState<UserState>({
    id: 0,
    email: "",
    password: "",
    is_active: true,
    user_type: "S", // Valor inicial padrão
  });

  const getUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetchUsers();
      console.log("Users fetched:", response.users);
      setUsers(response.users);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleEdit = async (id: string) => {
    console.log("Edit clicked for user:", id);
    try {
      const user = await fetchUser(id);
      const user_type = (user.user_type as UserType) || "S"; // Type assertion com fallback seguro
      setUser({
        id: user.id || 0,
        email: user.email || "",
        password: user.password || "",
        is_active: user.is_active || 0,
        user_type,
      });

      if (window.bootstrap && window.bootstrap.Modal) {
        const modal = new window.bootstrap.Modal(
          document.getElementById("modalUser"),
        );
        modal.show();
      }
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
    }
  };

  const handleDelete = (id: string) => {
    console.log("Delete clicked for user:", id);
    // Adicione a lógica de exclusão aqui
  };

  const confirmDelete = (id: string) => {
    Swal.fire({
      title: "Deseja excluir este item?",
      text: "Você não poderá reverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, exclua isso!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteUser(id);
      }
    });
  };

  const handleDeleteUser = async (id: string) => {
    console.log("Delete result with ID:", id);
    // try {
    //   const success = await deleteUser(id);
    //   if (success) {
    //     toast.success("Usuário deletado com sucesso");
    //     await getUsers();
    //   } else {
    //     toast.error("Erro ao deletar resultado");
    //   }
    // } catch (error) {
    //   toast.error("Erro ao deletar resultado da busca");
    //   console.error("Erro ao deletar resultado:", error);
    // }
  };

  const handleNewUser = () => {
    setUser({
      id: 0,
      email: "",
      password: "",
      is_active: true,
      user_type: "S", // Valor inicial padrão
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value as UserType, // Type assertion para user_type
    }));
  };

  const handleSaveUser = async () => {
    // Remover o campo id se estamos criando um novo usuário
    if (user.id === 0) {
      const { id, ...userWithoutId } = user;

      const result = await createUser(userWithoutId);

      if (result) {
        toast.success("Usuário criado com sucesso!");

        if (modalRef.current) {
          const modalElement = modalRef.current as HTMLElement;
          const modalInstance =
            window.bootstrap.Modal.getInstance(modalElement);
          modalInstance?.hide();
        }

        await getUsers(); // Atualiza a lista de usuários
      } else {
        toast.error("Erro ao criar usuário");
      }
    } else {
      console.log(
        "Operação não suportada: Tentativa de salvar um usuário existente.",
      );
    }
  };

  const handleFocus = (
    event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setTimeout(() => {
      event.target.focus();
    }, 0);
  };

  return (
    <>
      <AuthWrapper>
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
                Visualizar usuários cadastrados no sistema.
              </p>
            </div>
          </div>

          <div className="content__boxed">
            <div className="content__wrap">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="mb-3">
                    <h2>
                      Usuários - <small>Estoque de itens</small>
                    </h2>
                    <p className="m-0">
                      Utilize as ferramentas de busca e filtro para encontrar
                      usuários específicos e gerenciar os usuários de forma
                      eficiente
                    </p>
                  </div>

                  <div className="d-flex flex-wrap align-items-end justify-content-end gap-2 mb-3 pb-3">
                    <button
                      type="button"
                      className="btn btn-primary hstack gap-2 align-self-center"
                      data-bs-toggle="modal"
                      data-bs-target="#modalUser"
                      onClick={handleNewUser}
                    >
                      <i className="demo-psi-add fs-5" />
                      <span className="vr" />
                      Novo usuário
                    </button>
                  </div>
                  <div className="row">
                    <GridTableUsers
                      data={users || []}
                      onEdit={handleEdit}
                      onDelete={confirmDelete}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {loading ? (
          <p>Carregando produtos...</p>
        ) : (
          <UserModal
            user={user}
            onChange={handleChange}
            onSave={handleSaveUser}
            modalRef={modalRef}
            onFocus={handleFocus}
          />
        )}
      </AuthWrapper>
    </>
  );
};

export default Users;
