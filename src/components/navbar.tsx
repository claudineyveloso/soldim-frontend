"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const mapUserType = (type: string | undefined) => {
  switch (type) {
    case "S":
      return "Super Admin";
    case "A":
      return "Admin";
    case "C":
      return "Colaborador";
    default:
      return "Desconhecido";
  }
};

export default function NavBar() {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [isNavExpanded, setIsNavExpanded] = useState<{
    [key: string]: boolean;
  }>({});
  const { data: session } = useSession();

  useEffect(() => {
    // Recuperar o estado salvo no localStorage quando o componente for montado
    const savedActiveItem = localStorage.getItem("activeItem");
    if (savedActiveItem) {
      setActiveItem(savedActiveItem);
    }
  }, []);

  const handleItemClick = (item: string) => {
    setActiveItem(item);
    localStorage.setItem("activeItem", item);
  };

  const toggleNav = (item: string) => {
    setIsNavExpanded((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  console.log("Valor de session", session);
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
                    <h5 className="mb-0 me-3">
                      {session?.user?.email || "Usuário Desconhecido"}
                    </h5>
                  </span>
                  <small className="text-body-secondary">
                    {mapUserType(session?.user?.user_type)}
                  </small>
                </button>
                <div id="usernav" className="nav flex-column collapse">
                  <Link
                    href="#root"
                    className="nav-link d-flex justify-content-between align-items-center"
                  >
                    <span>
                      <i className="demo-pli-mail fs-5 me-2" />
                      <span className="ms-1">Mensagens</span>
                    </span>
                    <span className="badge bg-danger rounded-pill">14</span>
                  </Link>
                  <Link href="/profile" className="nav-link">
                    <i className="demo-pli-male fs-5 me-2" />
                    <span className="ms-1">Perfil</span>
                  </Link>
                  <Link href="#root" className="nav-link">
                    <i className="demo-pli-gear fs-5 me-2" />
                    <span className="ms-1">Configurações</span>
                  </Link>
                  <Link href="#root" className="nav-link">
                    <i className="demo-pli-computer-secure fs-5 me-2" />
                    <span className="ms-1">Bloqueio de tela</span>
                  </Link>
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
                <Link
                  href="#"
                  className={`mininav-toggle nav-link ${
                    isNavExpanded["dashboard"] ? "collapse show" : "collapsed"
                  } ${
                    activeItem === "diary" || activeItem === "monthly"
                      ? "active"
                      : ""
                  }`}
                  onClick={() => toggleNav("dashboard")}
                >
                  <i className="pli-statistic fs-5 me-2"></i>
                  <span className="nav-label ms-1">Dashboard</span>
                </Link>

                <ul
                  className={`mininav-content nav collapse ${
                    isNavExpanded["dashboard"] ? "show" : ""
                  }`}
                >
                  <li data-popper-arrow className="arrow"></li>
                  <li className="nav-item">
                    <Link
                      href="/dashboard"
                      className={`nav-link ${activeItem === "diary" ? "active" : ""}`}
                      onClick={() => handleItemClick("diary")}
                    >
                      Diária
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      href="/dashboard"
                      className={`nav-link ${activeItem === "monthly" ? "active" : ""}`}
                      onClick={() => handleItemClick("monthly")}
                    >
                      Mensal
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="mainnav__categoriy py-3">
            <h6 className="mainnav__caption mt-0 fw-bold">Produtos</h6>

            <ul className="mainnav__menu nav flex-column">
              <li className="nav-item has-sub">
                <Link
                  href="#"
                  className={`mininav-toggle nav-link ${
                    isNavExpanded["products"] ? "collapse show" : "collapsed"
                  } ${
                    activeItem === "product-stock" ||
                    activeItem === "suggestion" ||
                    activeItem === "no-movement"
                      ? "active"
                      : ""
                  }`}
                  onClick={() => toggleNav("products")}
                >
                  <i className="pli-checkout fs-5 me-2"></i>
                  <span className="nav-label ms-1">Consumo</span>
                </Link>
                <ul
                  className={`mininav-content nav collapse ${
                    isNavExpanded["products"] ? "show" : ""
                  }`}
                >
                  <li data-popper-arrow className="arrow"></li>
                  <li className="nav-item">
                    <Link
                      href="/products"
                      className={`nav-link ${activeItem === "product-stock" ? "active" : ""}`}
                      onClick={() => handleItemClick("product-stock")}
                    >
                      Estoque de items
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      href="/shopping_options"
                      className={`nav-link ${activeItem === "suggestion" ? "active" : ""}`}
                      onClick={() => handleItemClick("suggestion")}
                    >
                      Sem estoque
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      href="/no_movements"
                      className={`nav-link ${activeItem === "no-movement" ? "active" : ""}`}
                      onClick={() => handleItemClick("no-movement")}
                    >
                      Sem movimento
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="mainnav__categoriy py-3">
            <h6 className="mainnav__caption mt-0 fw-bold">Vendas</h6>

            <ul className="mainnav__menu nav flex-column">
              <li className="nav-item has-sub">
                <Link
                  href="#"
                  className={`mininav-toggle nav-link ${
                    isNavExpanded["sales_orders"]
                      ? "collapse show"
                      : "collapsed"
                  } ${
                    activeItem === "sales-order" ||
                    activeItem === "sales-seller" ||
                    activeItem === "sales-channel" ||
                    activeItem === "stock-forecast"
                      ? "active"
                      : ""
                  }`}
                  onClick={() => toggleNav("sales_orders")}
                >
                  <i className="pli-handshake fs-5 me-2"></i>
                  <span className="nav-label ms-1">Negociação</span>
                </Link>
                <ul
                  className={`mininav-content nav collapse ${
                    isNavExpanded["sales_orders"] ? "show" : ""
                  }`}
                >
                  <li data-popper-arrow className="arrow"></li>
                  <li className="nav-item">
                    <Link
                      href="/sales_orders"
                      className={`nav-link ${activeItem === "sales-order" ? "active" : ""}`}
                      onClick={() => handleItemClick("sales-order")}
                    >
                      Pedidos de vendas
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      href="sales_by_seller"
                      className={`nav-link ${activeItem === "sales-saller" ? "active" : ""}`}
                      onClick={() => handleItemClick("sales-saller")}
                    >
                      Vendas vendedor
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      href="sales_by_channel"
                      className={`nav-link ${activeItem === "sales-channel" ? "active" : ""}`}
                      onClick={() => handleItemClick("sales-channel")}
                    >
                      Vendas por canal
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      href="./dashboard-2.html"
                      className={`nav-link ${activeItem === "stock-forecast" ? "active" : ""}`}
                      onClick={() => handleItemClick("stock-forecast")}
                    >
                      Previsão de estoque
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="mainnav__categoriy py-3">
            <h6 className="mainnav__caption mt-0 fw-bold">Coleta</h6>
            <ul className="mainnav__menu nav flex-column">
              <li className="nav-item has-sub">
                <Link
                  href="#"
                  className={`mininav-toggle nav-link ${
                    isNavExpanded["storage_products"]
                      ? "collapse show"
                      : "collapsed"
                  } ${
                    activeItem === "researches" || activeItem === "storage"
                      ? "active"
                      : ""
                  }`}
                  onClick={() => toggleNav("storage_products")}
                >
                  <i className="pli-arrow-loop fs-5 me-2"></i>
                  <span className="nav-label ms-1">Armazenamento</span>
                </Link>
                <ul
                  className={`mininav-content nav collapse ${
                    isNavExpanded["storage_products"] ? "show" : ""
                  }`}
                >
                  <li data-popper-arrow className="arrow"></li>
                  <li className="nav-item">
                    <Link
                      href="/search"
                      className={`nav-link ${activeItem === "researches" ? "active" : ""}`}
                      onClick={() => handleItemClick("researches")}
                    >
                      Pesquisas
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      href="/collect_product"
                      className={`nav-link ${activeItem === "storage" ? "active" : ""}`}
                      onClick={() => handleItemClick("storage")}
                    >
                      Coleta de preços
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="mainnav__categoriy py-3">
            <h6 className="mainnav__caption mt-0 fw-bold">Lote</h6>
            <ul className="mainnav__menu nav flex-column">
              <li className="nav-item has-sub">
                <Link
                  href="#"
                  className={`mininav-toggle nav-link ${
                    isNavExpanded["batch_products"]
                      ? "collapse show"
                      : "collapsed"
                  } ${
                    activeItem === "batch" || activeItem === "triageImport"
                      ? "active"
                      : ""
                  }`}
                  onClick={() => toggleNav("batch_products")}
                >
                  <i className="pli-arrow-loop fs-5 me-2"></i>
                  <span className="nav-label ms-1">Triagem</span>
                </Link>
                <ul
                  className={`mininav-content nav collapse ${
                    isNavExpanded["batch_products"] ? "show" : ""
                  }`}
                >
                  <li data-popper-arrow className="arrow"></li>
                  <li className="nav-item">
                    <Link
                      href="/file_upload"
                      className={`nav-link ${activeItem === "batch" ? "active" : ""}`}
                      onClick={() => handleItemClick("batch")}
                    >
                      Importar
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      href="/triage"
                      className={`nav-link ${activeItem === "triage" ? "active" : ""}`}
                      onClick={() => handleItemClick("triage")}
                    >
                      Listagem
                    </Link>
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
            <h6 className="mainnav__caption mt-0 fw-bold">Importação</h6>
            <ul className="mainnav__menu nav flex-column">
              <li className="nav-item">
                <Link href="/drafts" className="nav-link mininav-toggle">
                  <i className="pli-file-share fs-5 me-2" />
                  <span className="nav-label mininav-content ms-1">
                    <span data-popper-arrow className="arrow" />
                    Rascunho
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
                      aria-valuenow={35}
                      aria-valuemin={0}
                      aria-valuemax={100}
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
                      aria-valuenow={73}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    ></div>
                  </div>
                </li>
              </ul>
              <div className="d-grid px-3 mt-3">
                <Link href="#root" className="btn btn-sm btn-success">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mainnav__bottom-content border-top pb-2">
          <ul id="mainnav" className="mainnav__menu nav flex-column">
            <li className="nav-item has-sub">
              <Link
                href="#root"
                className="nav-link mininav-toggle collapsed"
                aria-expanded="false"
              >
                <i className="demo-pli-unlock fs-5 me-2" />
                <span className="nav-label ms-1">Logout</span>
              </Link>
              <ul className="mininav-content nav flex-column collapse">
                <li data-popper-arrow className="arrow" />
                <li className="nav-item">
                  <Link href="#root" className="nav-link">
                    This device only
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="#root" className="nav-link">
                    All Devices
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link disabled"
                    href="#root"
                    tabIndex={-1}
                    aria-disabled="true"
                  >
                    Lock screen
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
