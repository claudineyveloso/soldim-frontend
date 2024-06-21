import Image from "next/image";
export default function SideBar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__inner scrollable-content">
        <div className="sidebar__stuck align-items-center mb-3 px-3">
          <button
            type="button"
            className="sidebar-toggler btn-close btn-lg rounded-circle"
            aria-label="Close"
          ></button>
          <p className="m-0 text-danger fw-bold">&lt;= Close the sidebar</p>
        </div>
        <div className="sidebar__wrap">
          <nav>
            <div
              className="nav nav-underline nav-fill nav-component flex-nowrap border-bottom"
              id="nav-tab"
              role="tablist"
            >
              <button
                className="nav-link active"
                data-bs-toggle="tab"
                data-bs-target="#nav-chat"
                type="button"
                role="tab"
                aria-controls="nav-chat"
                aria-selected="true"
              >
                <i className="d-block demo-pli-speech-bubble-5 fs-3 mb-2" />
                <span>Chat</span>
              </button>
              <button
                className="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#nav-reports"
                type="button"
                role="tab"
                aria-controls="nav-reports"
                aria-selected="false"
              >
                <i className="d-block demo-pli-information fs-3 mb-2" />
                <span>Relátorios</span>
              </button>
              <button
                className="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#nav-settings"
                type="button"
                role="tab"
                aria-controls="nav-settings"
                aria-selected="false"
              >
                <i className="d-block demo-pli-wrench fs-3 mb-2" />
                <span>Configurações</span>
              </button>
            </div>
          </nav>
        </div>
        <div className="tab-content sidebar__wrap" id="nav-tabContent">
          <div
            id="nav-chat"
            className="tab-pane fade py-4 show active"
            role="tabpanel"
            aria-labelledby="nav-chat-tab"
          >
            <h5 className="px-3">Family</h5>
            <div className="list-group list-group-borderless">
              <div className="list-group-item list-group-item-action d-flex align-items-start mb-2">
                <div className="flex-shrink-0 me-3">
                  <Image
                    className="img-xs rounded-circle"
                    src="/assets/img/profile-photos/2.png"
                    alt="Soldim Logo"
                    width={123}
                    height={123}
                  />
                </div>
                <div className="flex-grow-1 ">
                  <a
                    href="#"
                    className="h6 d-block mb-0 stretched-link text-decoration-none"
                  >
                    Stephen Tran
                  </a>
                  <small className="text-body-secondary">Available</small>
                </div>
              </div>
              <div className="list-group-item list-group-item-action d-flex align-items-start mb-2">
                <div className="flex-shrink-0 me-3">
                  <Image
                    className="img-xs rounded-circle"
                    src="/assets/img/profile-photos/8.png"
                    alt="Soldim Logo"
                    width={123}
                    height={123}
                  />
                </div>
                <div className="flex-grow-1 ">
                  <a
                    href="#"
                    className="h6 d-block mb-0 stretched-link text-decoration-none"
                  >
                    Betty Murphy
                  </a>
                  <small className="text-body-secondary">Iddle</small>
                </div>
              </div>
              <div className="list-group-item list-group-item-action d-flex align-items-start mb-2">
                <div className="flex-shrink-0 me-3">
                  <Image
                    className="img-xs rounded-circle"
                    src="/assets/img/profile-photos/7.png"
                    alt="Soldim Logo"
                    width={123}
                    height={123}
                  />
                </div>
                <div className="flex-grow-1 ">
                  <a
                    href="#"
                    className="h6 d-block mb-0 stretched-link text-decoration-none"
                  >
                    Brittany Meyer
                  </a>
                  <small className="text-body-secondary">I think so!</small>
                </div>
              </div>
              <div className="list-group-item list-group-item-action d-flex align-items-start mb-2">
                <div className="flex-shrink-0 me-3">
                  <Image
                    className="img-xs rounded-circle"
                    src="/assets/img/profile-photos/4.png"
                    alt="Soldim Logo"
                    width={123}
                    height={123}
                  />
                </div>
                <div className="flex-grow-1 ">
                  <a
                    href="#"
                    className="h6 d-block mb-0 stretched-link text-decoration-none"
                  >
                    Jack George
                  </a>
                  <small className="text-body-secondary">
                    Last seen 2 hours ago
                  </small>
                </div>
              </div>
            </div>
            <h5 className="d-flex mt-5 px-3">
              Friends <span className="badge bg-success ms-auto">587 +</span>
            </h5>
            <div className="list-group list-group-borderless">
              <a href="#" className="list-group-item list-group-item-action">
                <span className="d-inline-block bg-success rounded-circle p-1 me-2"></span>
                Joey K. Greyson
              </a>
              <a href="#" className="list-group-item list-group-item-action">
                <span className="d-inline-block bg-info rounded-circle p-1 me-2"></span>
                Andrea Branden
              </a>
              <a href="#" className="list-group-item list-group-item-action">
                <span className="d-inline-block bg-warning rounded-circle p-1 me-2"></span>
                Johny Juan
              </a>
              <a href="#" className="list-group-item list-group-item-action">
                <span className="d-inline-block bg-secondary rounded-circle p-1 me-2"></span>
                Susan Sun
              </a>
            </div>
            <div className="p-3 mt-5 rounded bg-info-subtle text-info-emphasis">
              <h5 className="text-info-emphasis">News</h5>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui
                consequatur ipsum porro a repellat eaque exercitationem
                necessitatibus esse voluptate corporis.
              </p>
              <small className="fst-italic">Last Update : Today 13:54</small>
            </div>
          </div>
          <div
            id="nav-reports"
            className="tab-pane fade py-4"
            role="tabpanel"
            aria-labelledby="nav-reports-tab"
          >
            <div className="px-3">
              <h5 className="mb-3">Faturamento &amp; Relatórios</h5>
              <p>
                Ganhe <span className="badge bg-danger">R$ 15,00 de</span>{" "}
                desconto em sua próxima fatura, certificando-se de que o
                pagamento integral chegue até nós antes de 5 de agosto.
              </p>
              <h5 className="mt-5 mb-0">Valor devido em:</h5>
              <p>19 de Junho de 2024</p>
              <p className="h1">R$ 83,09</p>
              <div className="d-grid">
                <button className="btn btn-success" type="button">
                  Receber agora
                </button>
              </div>
            </div>
            <h5 className="mt-5 px-3">Additional Actions</h5>
            <div className="list-group list-group-borderless">
              <a href="#" className="list-group-item list-group-item-action">
                <i className="demo-pli-information me-2 fs-5"></i>
                Services Information
              </a>
              <a href="#" className="list-group-item list-group-item-action">
                <i className="demo-pli-mine me-2 fs-5"></i>
                Usage
              </a>
              <a href="#" className="list-group-item list-group-item-action">
                <i className="demo-pli-credit-card-2 me-2 fs-5"></i>
                Payment Options
              </a>
              <a href="#" className="list-group-item list-group-item-action">
                <i className="demo-pli-support me-2 fs-5"></i>
                Messages Center
              </a>
            </div>
            <div className="px-3 mt-5 text-center">
              <div className="mb-3">
                <i className="demo-pli-old-telephone display-4 text-primary"></i>
              </div>
              <p>Tem alguma dúvida ?</p>
              <p className="h5 mb-0"> (415) 234-53454 </p>
              <small>
                <em>Estamos aqui 24 horas por dia, 7 dias por semana</em>
              </small>
            </div>
          </div>
          <div
            id="nav-settings"
            className="tab-pane fade py-4"
            role="tabpanel"
            aria-labelledby="nav-settings-tab"
          >
            <h5 className="px-3">Account Settings</h5>
            <div className="list-group list-group-borderless">
              <div className="list-group-item mb-1">
                <div className="d-flex justify-content-between mb-1">
                  <label
                    className="form-check-label text-body-emphasis stretched-link"
                    htmlFor="_dm-sbPersonalStatus"
                  >
                    Show my personal status
                  </label>
                  <div className="form-check form-switch">
                    <input
                      id="_dm-sbPersonalStatus"
                      className="form-check-input"
                      type="checkbox"
                      checked
                    />
                  </div>
                </div>
                <small className="text-body-secondary">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                </small>
              </div>
              <div className="list-group-item mb-1">
                <div className="d-flex justify-content-between mb-1">
                  <label
                    className="form-check-label text-body-emphasis stretched-link"
                    htmlFor="_dm-sbOfflineContact"
                  >
                    Show offline contact
                  </label>
                  <div className="form-check form-switch">
                    <input
                      id="_dm-sbOfflineContact"
                      className="form-check-input"
                      type="checkbox"
                    />
                  </div>
                </div>
                <small className="text-body-secondary">
                  Aenean commodo ligula eget dolor. Aenean massa.
                </small>
              </div>
              <div className="list-group-item mb-1">
                <div className="d-flex justify-content-between mb-1">
                  <label
                    className="form-check-label text-body-emphasis stretched-link"
                    htmlFor="_dm-sbInvisibleMode"
                  >
                    Invisible Mode
                  </label>
                  <div className="form-check form-switch">
                    <input
                      id="_dm-sbInvisibleMode"
                      className="form-check-input"
                      type="checkbox"
                    />
                  </div>
                </div>
                <small className="text-body-secondary">
                  Cum sociis natoque penatibus et magnis dis parturient montes,
                  nascetur ridiculus mus.
                </small>
              </div>
            </div>
            <h5 className="mt-5 px-3">Public Settings</h5>
            <div className="list-group list-group-borderless">
              <div className="list-group-item d-flex justify-content-between mb-1">
                <label
                  className="form-check-label"
                  htmlFor="_dm-sbOnlineStatus"
                >
                  Online Status
                </label>
                <div className="form-check form-switch">
                  <input
                    id="_dm-sbOnlineStatus"
                    className="form-check-input"
                    type="checkbox"
                    checked
                  />
                </div>
              </div>
              <div className="list-group-item d-flex justify-content-between mb-1">
                <label
                  className="form-check-label"
                  htmlFor="_dm-sbMuteNotifications"
                >
                  Mute Notifications
                </label>
                <div className="form-check form-switch">
                  <input
                    id="_dm-sbMuteNotifications"
                    className="form-check-input"
                    type="checkbox"
                    checked
                  />
                </div>
              </div>
              <div className="list-group-item d-flex justify-content-between mb-1">
                <label
                  className="form-check-label"
                  htmlFor="_dm-sbMyDevicesName"
                >
                  Show my device name
                </label>
                <div className="form-check form-switch">
                  <input
                    id="_dm-sbMyDevicesName"
                    className="form-check-input"
                    type="checkbox"
                    checked
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
