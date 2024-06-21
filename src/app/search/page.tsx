"use client";
import React, { useState } from "react";
import Link from "next/link";
const Searches = () => {
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
                Pesquisas
              </li>
            </ol>
          </nav>
          <h1 className="page-title mb-0 mt-2">Lista de pesquisas recentes</h1>
          <p className="lead">
            Visualizar, adicionar, editar e excluir pesquisas cadastradas no
            sistema.
          </p>
        </div>
      </div>
      <div className="content__boxed">
        <div className="content__wrap">
          <div className="card mb-3">
            <div className="card-body">
              <div className="mb-3">
                <h2>Pesquisas recentes</h2>
                <p className="m-0">
                  Utilize as ferramentas de busca e filtro para encontrar
                  pesquisas específicas e gerenciar seus perfis de forma
                  eficiente
                </p>
                <p className="mt-2">
                  <i className="demo-psi-coding h4 mb-0 me-2"></i>
                  <a
                    className="btn-link text-decoration-underline"
                    href="https://github.com/olifolkerd/tabulator"
                    target="blank"
                  ></a>
                </p>
              </div>
              <hr />
              <h3 className="h4">Listagem</h3>
              <div id="_dm-tabulatorBasic" className="table"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Searches;
