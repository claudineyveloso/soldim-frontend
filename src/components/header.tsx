import Image from "next/image";

export default function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__brand">
          <div className="brand-wrap">
            <a href="index.html" className="brand-img stretched-link">
              <Image
                src="./assets/img/logo.svg"
                alt="Soldim Logo"
                width={123}
                height={123}
              />
            </a>
            <div className="brand-title">Soldim</div>
          </div>
        </div>
        <div className="header__content">
          <div className="header__content-start">
            <button
              type="button"
              className="nav-toggler header__btn btn btn-icon btn-sm"
              aria-label="Nav Toggler"
            >
              <i className="demo-psi-list-view" />
            </button>
            <div className="vr mx-1 d-none d-md-block" />
            <div className="header-searchbox">
              <label
                htmlFor="header-search-input"
                className="header__btn d-md-none btn btn-icon rounded-pill shadow-none border-0 btn-sm"
              >
                <i className="demo-psi-magnifi-glass" />
              </label>
            </div>
          </div>
          <div className="header__content-end">
            <div className="dropdown">
              <button
                className="header__btn btn btn-icon btn-sm"
                type="button"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                aria-label="Megamenu dropdown"
                aria-expanded="false"
              >
                <i className="demo-psi-layout-grid" />
              </button>
              <div className="dropdown-menu dropdown-menu-end p-3 mega-dropdown">
                <div className="row">
                  <div className="col-md-3">
                    <div className="list-group list-group-borderless">
                      <div className="list-group-item d-flex align-items-center border-bottom mb-2">
                        <div className="flex-shrink-0 me-2">
                          <i className="demo-pli-file fs-4" />
                        </div>
                        <h5 className="flex-grow-1 m-0">Pages</h5>
                      </div>
                      <a
                        href="#root"
                        className="list-group-item list-group-item-action"
                      >
                        Profile
                      </a>
                      <a
                        href="#root"
                        className="list-group-item list-group-item-action"
                      >
                        Search Result
                      </a>
                      <a
                        href="#root"
                        className="list-group-item list-group-item-action"
                      >
                        FAQ
                      </a>
                      <a
                        href="#root"
                        className="list-group-item list-group-item-action"
                      >
                        Screen Lock
                      </a>
                      <a
                        href="#root"
                        className="list-group-item list-group-item-action"
                      >
                        Maintenance
                      </a>
                      <a
                        href="#root"
                        className="list-group-item list-group-item-action"
                      >
                        Invoices
                      </a>
                      <a
                        href="#root"
                        className="list-group-item list-group-item-action disabled"
                        tabIndex={-1}
                        aria-disabled="true"
                      >
                        Disabled Item
                      </a>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="list-group list-group-borderless mb-3">
                      <div className="list-group-item d-flex align-items-center border-bottom mb-2">
                        <div className="flex-shrink-0 me-2">
                          <i className="demo-pli-mail fs-4" />
                        </div>
                        <h5 className="flex-grow-1 m-0">Mailbox</h5>
                      </div>
                      <a
                        href="#root"
                        className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                      >
                        Inbox{" "}
                        <span className="badge bg-danger rounded-pill">14</span>
                      </a>
                      <a
                        href="#roo"
                        className="list-group-item list-group-item-action"
                      >
                        Read Messages
                      </a>
                      <a
                        href="#roo"
                        className="list-group-item list-group-item-action"
                      >
                        Compose
                      </a>
                      <a
                        href="#root"
                        className="list-group-item list-group-item-action"
                      >
                        Template
                      </a>
                    </div>
                    <div className="list-group list-group-borderless bg-warning-subtle py-2">
                      <div className="list-group-item d-flex align-items-center border-bottom text-warning-emphasis">
                        <div className="flex-shrink-0 me-2">
                          <i className="demo-pli-calendar-4 fs-4" />
                        </div>
                        <h5 className="flex-grow-1 m-0 text-reset">News</h5>
                      </div>
                      <small className="list-group-item text-warning-emphasis">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Hic dolore unde autem, molestiae eum laborum
                        aliquid at commodi cum? Blanditiis.
                      </small>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="list-group list-group-borderless">
                      <div className="list-group-item list-group-item-action d-flex align-items-start mb-3">
                        <div className="flex-shrink-0 me-3">
                          <i className="demo-pli-data-settings fs-1" />
                        </div>
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between align-items-start">
                            <a
                              href="#root"
                              className="h5 d-block mb-0 stretched-link text-decoration-none"
                            >
                              Data Backup
                            </a>
                            <span className="badge bg-success rounded-pill ms-auto">
                              40%
                            </span>
                          </div>
                          <small className="text-body-secondary">
                            Current usage of disks for backups.
                          </small>
                        </div>
                      </div>
                      <div className="list-group-item list-group-item-action d-flex align-items-start mb-3">
                        <div className="flex-shrink-0 me-3">
                          <i className="demo-pli-support fs-1" />
                        </div>
                        <div className="flex-grow-1">
                          <a
                            href="#root"
                            className="h5 d-block mb-0 stretched-link text-decoration-none"
                          >
                            Support
                          </a>
                          <small className="text-body-secondary">
                            Have any questions ? please dont hesitate to ask.
                          </small>
                        </div>
                      </div>
                      <div className="list-group-item list-group-item-action d-flex align-items-start mb-3">
                        <div className="flex-shrink-0 me-3">
                          <i className="demo-pli-computer-secure fs-1" />
                        </div>
                        <div className="flex-grow-1">
                          <a
                            href="#root"
                            className="h5 d-block mb-0 stretched-link text-decoration-none"
                          >
                            Security
                          </a>
                          <small className="text-body-secondary">
                            Our devices are secure and up-to-date.
                          </small>
                        </div>
                      </div>
                      <div className="list-group-item list-group-item-action d-flex align-items-start">
                        <div className="flex-shrink-0 me-3">
                          <i className="demo-pli-map-2 fs-1" />
                        </div>
                        <div className="flex-grow-1">
                          <a
                            href="#root"
                            className="h5 d-block mb-0 stretched-link text-decoration-none"
                          >
                            Location
                          </a>
                          <small className="text-body-secondary">
                            From our location up here, we kept in close touch.
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="d-grid gap-2 pt-4 pt-md-0">
                      <div className="row g-1 rounded-3 overflow-hidden">
                        <div className="col-6 mt-0">
                          <Image
                            className="img-fluid"
                            src="/assets/img/megamenu/img-1.jpg"
                            alt="thumbnails"
                            width={256}
                            height={256}
                          />
                        </div>
                        <div className="col-6 mt-0">
                          <Image
                            className="img-fluid"
                            src="/assets/img/megamenu/img-3.jpg"
                            alt="thumbnails"
                            width={256}
                            height={256}
                          />
                        </div>
                        <div className="col-6">
                          <Image
                            className="img-fluid"
                            src="/assets/img/megamenu/img-2.jpg"
                            alt="thumbnails"
                            width={256}
                            height={256}
                          />
                        </div>
                        <div className="col-6">
                          <Image
                            className="img-fluid"
                            src="/assets/img/megamenu/img-4.jpg"
                            alt="thumbnails"
                            width={256}
                            height={256}
                          />
                        </div>
                      </div>
                      <a href="#root" className="btn btn-primary">
                        Browse Gallery
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="dropdown">
              <button
                className="header__btn btn btn-icon btn-sm"
                type="button"
                data-bs-toggle="dropdown"
                aria-label="Notification dropdown"
                aria-expanded="false"
              >
                <span className="d-block position-relative">
                  <i className="demo-psi-bell" />
                  <span className="badge badge-super rounded-pill bg-danger p-1">
                    <span className="visually-hidden">unread messages</span>
                  </span>
                </span>
              </button>
              <div className="dropdown-menu dropdown-menu-end w-md-300px">
                <div className="border-bottom px-3 py-2 mb-3">
                  <h5>Notificações</h5>
                </div>
                <div className="list-group list-group-borderless">
                  <div className="list-group-item list-group-item-action d-flex align-items-center mb-3">
                    <div className="flex-shrink-0 me-3">
                      <i className="demo-psi-data-settings text-danger fs-2" />
                    </div>
                    <div className="flex-grow-1">
                      <a
                        href="#root"
                        className="h6 fw-normal d-block mb-0 stretched-link text-decoration-none"
                      >
                        Your storage is full
                      </a>
                      <small className="text-body-secondary">
                        Local storage is nearly full.
                      </small>
                    </div>
                  </div>
                  <div className="list-group-item list-group-item-action d-flex align-items-center mb-3">
                    <div className="flex-shrink-0 me-3">
                      <i className="demo-psi-pen-5 text-info fs-2" />
                    </div>
                    <div className="flex-grow-1">
                      <a
                        href="#root"
                        className="h6 fw-normal d-block mb-0 stretched-link text-decoration-none"
                      >
                        Writing a New Article
                      </a>
                      <small className="text-body-secondary">
                        Wrote a news article for the John Mike
                      </small>
                    </div>
                  </div>
                  <div className="list-group-item list-group-item-action d-flex align-items-start mb-3">
                    <div className="flex-shrink-0 me-3">
                      <i className="demo-psi-speech-bubble-3 text-success fs-2" />
                    </div>
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between align-items-start">
                        <a
                          href="#root"
                          className="h6 fw-normal mb-0 stretched-link text-decoration-none"
                        >
                          Comment sorting
                        </a>
                        <span className="badge bg-info rounded ms-auto">
                          NEW
                        </span>
                      </div>
                      <small className="text-body-secondary">
                        You have 1,256 unsorted comments.
                      </small>
                    </div>
                  </div>
                  <div className="list-group-item list-group-item-action d-flex align-items-start mb-3">
                    <div className="flex-shrink-0 me-3">
                      <Image
                        className="img-xs rounded-circle"
                        src="/assets/img/profile-photos/7.png"
                        alt="Profile Pictures"
                        loading="lazy"
                        width={128}
                        height={128}
                      />
                    </div>
                    <div className="flex-grow-1">
                      <a
                        href="#root"
                        className="h6 fw-normal d-block mb-0 stretched-link text-decoration-none"
                      >
                        Lucy Sent you a message
                      </a>
                      <small className="text-body-secondary">
                        30 minutes ago
                      </small>
                    </div>
                  </div>
                  <div className="list-group-item list-group-item-action d-flex align-items-start mb-3">
                    <div className="flex-shrink-0 me-3">
                      <Image
                        className="img-xs rounded-circle"
                        src="/assets/img/profile-photos/3.png"
                        alt="Profile Pictures"
                        loading="lazy"
                        width={128}
                        height={128}
                      />
                    </div>
                    <div className="flex-grow-1">
                      <a
                        href="#root"
                        className="h6 fw-normal d-block mb-0 stretched-link text-decoration-none"
                      >
                        Jackson Sent you a message
                      </a>
                      <small className="text-body-secondary">1 hours ago</small>
                    </div>
                  </div>
                  <div className="text-center mb-2">
                    <a
                      href="#root"
                      className="btn-link text-primary icon-link icon-link-hover"
                    >
                      Show all Notifications
                      <i className="bi demo-psi-arrow-out-right" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="dropdown">
              <button
                className="header__btn btn btn-icon btn-sm"
                type="button"
                data-bs-toggle="dropdown"
                aria-label="User dropdown"
                aria-expanded="false"
              >
                <i className="demo-psi-male" />
              </button>
              <div className="dropdown-menu dropdown-menu-end w-md-450px">
                <div className="d-flex align-items-center border-bottom px-3 py-2">
                  <div className="flex-shrink-0">
                    <Image
                      className="img-sm rounded-circle"
                      src="/assets/img/claudiney.jpg"
                      alt="Profile Pictures"
                      loading="lazy"
                      width={128}
                      height={128}
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h5 className="mb-0">Claudiney Veloso</h5>
                    <span className="text-body-secondary fst-italic">
                      claudineyveloso@example.com
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-7">
                    <div className="list-group list-group-borderless mb-3">
                      <div className="list-group-item text-center border-bottom mb-3">
                        <p className="h1 display-1 text-primary fw-semibold">
                          17
                        </p>
                        <p className="h6 mb-0">
                          <i className="demo-pli-basket-coins fs-3 me-2" />{" "}
                          Novas pesquisas
                        </p>
                        <small className="text-body-secondary">
                          Você realizou 17 novas pesquisas
                        </small>
                      </div>
                      <div className="list-group-item py-0 d-flex justify-content-between align-items-center">
                        Ganhos de hoje
                        <small className="fw-bolder">R$ 578,00</small>
                      </div>
                      <div className="list-group-item py-0 d-flex justify-content-between align-items-center">
                        Taxas
                        <small className="fw-bolder text-danger">
                          - R$ 28,00
                        </small>
                      </div>
                      <div className="list-group-item py-0 d-flex justify-content-between align-items-center">
                        Total liquido
                        <span className="fw-bolder text-body-emphasis">
                          R$ 6.578,00
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="list-group list-group-borderless h-100 py-3">
                      <a
                        href="#root"
                        className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                      >
                        <span>
                          <i className="demo-pli-mail fs-5 me-2" /> Mensagens
                        </span>
                        <span className="badge bg-danger rounded-pill">14</span>
                      </a>
                      <a
                        href="#root"
                        className="list-group-item list-group-item-action"
                      >
                        <i className="demo-pli-male fs-5 me-2" /> Perfil
                      </a>
                      <a
                        href="#root"
                        className="list-group-item list-group-item-action"
                      >
                        <i className="demo-pli-gear fs-5 me-2" /> Configurações
                      </a>
                      <a
                        href="#root"
                        className="list-group-item list-group-item-action mt-auto"
                      >
                        <i className="demo-pli-computer-secure fs-5 me-2" />{" "}
                        Bloqueio de tela
                      </a>
                      <a
                        href="#root"
                        className="list-group-item list-group-item-action"
                      >
                        <i className="demo-pli-unlock fs-5 me-2" /> Sair
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="vr mx-1 d-none d-md-block" />
            <div className="form-check form-check-alt form-switch mx-md-2">
              <input
                id="headerThemeToggler"
                className="form-check-input mode-switcher"
                type="checkbox"
                role="switch"
              />
              <label
                className="form-check-label ps-1 fw-bold d-none d-md-flex align-items-center "
                htmlFor="headerThemeToggler"
              >
                <i className="mode-switcher-icon icon-light demo-psi-sun fs-5" />
                <i className="mode-switcher-icon icon-dark d-none demo-psi-half-moon" />
              </label>
            </div>
            <div className="vr mx-1 d-none d-md-block" />
            <button
              className="sidebar-toggler header__btn btn btn-icon btn-sm"
              type="button"
              aria-label="Sidebar button"
            >
              <i className="demo-psi-dot-vertical" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
