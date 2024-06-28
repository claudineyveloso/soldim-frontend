"use client";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function NavBar() {
  return (
    <nav id="mainnav-container" className="mainnav">
      <div className="mainnav__inner">
        <div className="mainnav__top-content scrollable-content pb-5">
          <div
            id="_dm-mainnavProfile"
            className="mainnav__widget my-3 hv-outline-parent"
          >
            <div className="mininav-toggle text-center py-2">
              <Image
                className="mainnav__avatar img-md rounded-circle hv-oc"
                src="/assets/img/claudiney.jpg"
                alt="Soldim Logo"
                width={123}
                height={123}
              />
            </div>
            <div className="mininav-content collapse d-mn-max">
              <span data-popper-arrow className="arrow" />
              <div className="d-grid">
                <button
                  type="button"
                  className="mainnav-widget-toggle d-block btn border-0 p-2"
                  data-bs-toggle="collapse"
                  data-bs-target="#usernav"
                  aria-expanded="false"
                  aria-controls="usernav"
                >
                  <span className="dropdown-toggle d-flex justify-content-center align-items-center">
                    <h5 className="mb-0 me-3">Claudiney Veloso</h5>
                  </span>
                  <small className="text-body-secondary">Administrator</small>
                </button>
                <div id="usernav" className="nav flex-column collapse">
                  <a
                    href="#root"
                    className="nav-link d-flex justify-content-between align-items-center"
                  >
                    <span>
                      <i className="demo-pli-mail fs-5 me-2" />
                      <span className="ms-1">Mensagens</span>
                    </span>
                    <span className="badge bg-danger rounded-pill">14</span>
                  </a>
                  <Link href="/profile" className="nav-link">
                    <i className="demo-pli-male fs-5 me-2" />
                    <span className="ms-1">Perfil</span>
                  </Link>
                  <a href="#root" className="nav-link">
                    <i className="demo-pli-gear fs-5 me-2" />
                    <span className="ms-1">Configurações</span>
                  </a>
                  <a href="#root" className="nav-link">
                    <i className="demo-pli-computer-secure fs-5 me-2" />
                    <span className="ms-1">Bloqueio de tela</span>
                  </a>
                  <Link href="#" className="nav-link" onClick={() => signOut()}>
                    <i className="demo-pli-unlock fs-5 me-2" />
                    <span className="ms-1">Sair</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mainnav__categoriy py-3">
            <h6 className="mainnav__caption mt-0 fw-bold">Navegação</h6>
            <ul className="mainnav__menu nav flex-column">
              <li className="nav-item has-sub">
                <a href="#" className="mininav-toggle nav-link active ">
                  <i className="demo-pli-home fs-5 me-2"></i>
                  <span className="nav-label ms-1">Dashboard</span>
                </a>
                <ul className="mininav-content nav collapse">
                  <li data-popper-arrow className="arrow"></li>
                  <li className="nav-item">
                    <a href="/dashboard" className="nav-link active">
                      Diária
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/dashboard" className="nav-link">
                      Mensal
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="mainnav__categoriy py-3">
            <h6 className="mainnav__caption mt-0 fw-bold">Produtos</h6>

            <ul className="mainnav__menu nav flex-column">
              <li className="nav-item has-sub">
                <a href="#" className="mininav-toggle nav-link collapsed">
                  <i className="demo-pli-home fs-5 me-2"></i>
                  <span className="nav-label ms-1">Consumo</span>
                </a>
                <ul className="mininav-content nav collapse">
                  <li data-popper-arrow className="arrow"></li>
                  <li className="nav-item">
                    <a href="/products" className="nav-link">
                      Estoque de produtos
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/products" className="nav-link">
                      Sugestão de compras
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/products" className="nav-link">
                      Sem movimentação
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="mainnav__categoriy py-3">
            <h6 className="mainnav__caption mt-0 fw-bold">Vendas</h6>

            <ul className="mainnav__menu nav flex-column">
              <li className="nav-item has-sub">
                <a href="#" className="mininav-toggle nav-link collapsed">
                  <i className="demo-pli-home fs-5 me-2"></i>
                  <span className="nav-label ms-1">Consumo</span>
                </a>
                <ul className="mininav-content nav collapse">
                  <li data-popper-arrow className="arrow"></li>
                  <li className="nav-item">
                    <a href="./index.html" className="nav-link">
                      Pedidos de vendas
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./dashboard-2.html" className="nav-link">
                      Vendas por vendedor
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./dashboard-2.html" className="nav-link">
                      Vendas por canal
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./dashboard-2.html" className="nav-link">
                      Previsão de estoque
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="mainnav__categoriy py-3">
            <h6 className="mainnav__caption mt-0 fw-bold">Cadastros</h6>
            <ul className="mainnav__menu nav flex-column">
              <li className="nav-item">
                <Link href="/users" className="nav-link mininav-toggle">
                  <i className="demo-pli-add-user fs-5 me-2" />
                  <span className="nav-label mininav-content ms-1">
                    <span data-popper-arrow className="arrow" />
                    Usuários
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="mainnav__categoriy py-3">
            <h6 className="mainnav__caption mt-0 fw-bold">Coleta</h6>
            <ul className="mainnav__menu nav flex-column">
              <li className="nav-item">
                <Link href="/search" className="nav-link mininav-toggle">
                  <i className="demo-pli-magnifi-glass fs-5 me-2" />
                  <span className="nav-label mininav-content ms-1">
                    <span data-popper-arrow className="arrow" />
                    Pesquisas
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/collect_product"
                  className="nav-link mininav-toggle"
                >
                  <i className="demo-pli-shopping-cart fs-5 me-2" />
                  <span className="nav-label mininav-content ms-1">
                    <span data-popper-arrow className="arrow" />
                    Coleta de preços
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="mainnav__categoriy py-3">
            <h6 className="mainnav__caption mt-0 fw-bold">Importaçãp</h6>
            <ul className="mainnav__menu nav flex-column">
              <li className="nav-item">
                <Link href="/users" className="nav-link mininav-toggle">
                  <i className="demo-pli-idea fs-5 me-2" />
                  <span className="nav-label mininav-content ms-1">
                    <span data-popper-arrow className="arrow" />
                    Bling
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="mainnav__widget">
            <div className="mininav-toggle text-center py-2 d-mn-min">
              <i className="demo-pli-monitor-2" />
            </div>
            <div className="d-mn-max mt-5" />
            <div className="mininav-content collapse d-mn-max">
              <span data-popper-arrow className="arrow" />
              <h6 className="mainnav__caption fw-bold">Server Status</h6>
              <ul className="list-group list-group-borderless">
                <li className="list-group-item text-reset">
                  <div className="d-flex justify-content-between align-items-start">
                    <p className="mb-2 me-auto">CPU Usage</p>
                    <span className="badge bg-info rounded">35%</span>
                  </div>
                  <div className="progress progress-md">
                    <div
                      className="progress-bar bg-info"
                      role="progressbar"
                      style={{ width: "35%" }}
                      aria-label="CPU Progress"
                      aria-valuenow="35"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </li>
                <li className="list-group-item text-reset">
                  <div className="d-flex justify-content-between align-items-start">
                    <p className="mb-2 me-auto">Bandwidth</p>
                    <span className="badge bg-warning rounded">73%</span>
                  </div>
                  <div className="progress progress-md">
                    <div
                      className="progress-bar bg-warning"
                      role="progressbar"
                      style={{ width: "73%" }}
                      aria-label="Bandwidth Progress"
                      aria-valuenow="73"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </li>
              </ul>
              <div className="d-grid px-3 mt-3">
                <a href="#root" className="btn btn-sm btn-success">
                  View Details
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mainnav__bottom-content border-top pb-2">
          <ul id="mainnav" className="mainnav__menu nav flex-column">
            <li className="nav-item has-sub">
              <a
                href="#root"
                className="nav-link mininav-toggle collapsed"
                aria-expanded="false"
              >
                <i className="demo-pli-unlock fs-5 me-2" />
                <span className="nav-label ms-1">Logout</span>
              </a>
              <ul className="mininav-content nav flex-column collapse">
                <li data-popper-arrow className="arrow" />
                <li className="nav-item">
                  <a href="#root" className="nav-link">
                    This device only
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#root" className="nav-link">
                    All Devices
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link disabled"
                    href="#root"
                    tabIndex={-1}
                    aria-disabled="true"
                  >
                    Lock screen
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
