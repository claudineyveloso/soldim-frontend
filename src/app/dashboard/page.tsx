"use client";
import SalesChart from "@/components/charts/sales";
import EarningChart from "@/components/charts/earning";
import OrdersChart from "@/components/charts/orders";
import DailyChart from "@/components/charts/daily";
import { AuthWrapper } from "@/components/AuthWrapper";

// src/app/home/page.tsx
export default function Dashboard() {
  return (
    // PAGE CONTAINER
    <AuthWrapper>
      <section id="content" className="content">
        <div className="content__header content__boxed overlapping">
          <div className="content__wrap">
            <h1 className="page-title mb-2">Dashboard</h1>
            <h2 className="h5">Bem-vindo de volta ao Painel..</h2>
            <p>
              Role para baixo para ver links rápidos e visões gerais dos seus
              produtos, lista de tarefas
              <br /> Status do pedido ou obter ajuda usando o Soldim.
            </p>
          </div>
        </div>
        <div className="content__boxed">
          <div className="content__wrap">
            <div className="row">
              <div className="col-xl-7 mb-3 mb-xl-0">
                <div className="card h-100">
                  <div className="card-header d-flex align-items-center border-0">
                    <div className="me-auto">
                      <h3 className="h4 m-0">Pedidos por dia</h3>
                    </div>
                    <div className="toolbar-end">
                      <button
                        type="button"
                        className="btn btn-icon btn-sm btn-hover btn-light"
                        aria-label="Refresh Network Chart"
                      >
                        <i className="demo-pli-repeat-2 fs-5" />
                      </button>
                      <div className="dropdown">
                        <button
                          type="button"
                          className="btn btn-icon btn-sm btn-hover btn-light"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          aria-label="Network dropdown"
                        >
                          <i className="demo-pli-dot-horizontal fs-4" />
                          <span className="visually-hidden">
                            Toggle Dropdown
                          </span>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                          <li>
                            <a href="#root" className="dropdown-item">
                              <i className="demo-pli-pen-5 fs-5 me-2" /> Edit
                              Date
                            </a>
                          </li>
                          <li>
                            <a href="#root" className="dropdown-item">
                              <i className="demo-pli-refresh fs-5 me-2" />{" "}
                              Refresh
                            </a>
                          </li>
                          <li>
                            <hr className="dropdown-divider" />
                          </li>
                          <li>
                            <a href="#root" className="dropdown-item">
                              <i className="demo-pli-file-csv fs-5 me-2" /> Save
                              as CSV
                            </a>
                          </li>
                          <li>
                            <a href="#root" className="dropdown-item">
                              <i className="demo-pli-calendar-4 fs-5 me-2" />{" "}
                              Ver Detalhes
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Network - Area Chart */}
                  <div
                    className="card-body py-0"
                    style={{ height: "250px", maxHeight: "275px" }}
                  >
                    <DailyChart />
                  </div>
                  {/* END : Network - Area Chart */}

                  <div className="card-body mt-4">
                    <div className="row">
                      <div className="col-md-8">
                        {/* CPU Temperature */}
                        <h4 className="h5 mb-3">CPU Temperature</h4>
                        <div className="row">
                          <div className="col-5">
                            <div className="h5 display-6 fw-normal">
                              43.7{" "}
                              <span className="fw-bold fs-5 align-top">°C</span>
                            </div>
                          </div>
                          <div className="col-7 text-sm">
                            <div className="d-flex justify-content-between align-items-start px-3 mb-3">
                              Min Values
                              <span className="d-block badge bg-success ms-auto">
                                27°
                              </span>
                            </div>
                            <div className="d-flex justify-content-between align-items-start px-3">
                              Max Values
                              <span className="d-block badge bg-danger ms-auto">
                                89°
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* END : CPU Temperature */}

                        {/* Today Tips */}
                        <div className="mt-4">
                          <h5>Today Tips</h5>
                          <p>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing
                            elit, sed diam nonummy nibh euismod tincidunt.
                          </p>
                        </div>
                        {/* Today Tips */}
                      </div>
                      <div className="col-md-4">
                        {/* Bandwidth usage and progress bars  */}
                        <h4 className="h5 mb-3">Bandwidth Usage</h4>
                        <div className="h2 fw-normal">
                          754.9<span className="ms-2 fs-6 align-top">Mbps</span>
                        </div>

                        <div className="mt-4 mb-2 d-flex justify-content-between">
                          <span className="">Renda</span>
                          <span className="">70%</span>
                        </div>
                        <div className="progress progress-md">
                          <div
                            className="progress-bar bg-success"
                            role="progressbar"
                            style={{ width: "70%" }}
                            aria-label="Incoming Progress"
                            aria-valuenow={70}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>

                        <div className="mt-4 mb-2 d-flex justify-content-between">
                          <span className="">Resultado</span>
                          <span className="">10%</span>
                        </div>
                        <div className="progress progress-md">
                          <div
                            className="progress-bar bg-info"
                            role="progressbar"
                            style={{ width: "10%" }}
                            aria-valuenow={10}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                        {/* END : Bandwidth usage and progress bars */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-5">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="card bg-success text-white overflow-hidden mb-3">
                      <div className="p-3 pb-2">
                        <h5 className="mb-3">
                          <i className="demo-psi-data-storage text-reset text-opacity-75 fs-3 me-2" />{" "}
                          Pedidos
                        </h5>
                        <ul className="list-group list-group-borderless">
                          <li className="list-group-item p-0 text-reset d-flex justify-content-between align-items-start">
                            <div className="me-auto">Unidades</div>
                            <span className="fw-bold">300</span>
                          </li>
                          <li className="list-group-item p-0 text-reset d-flex justify-content-between align-items-start">
                            <div className="me-auto">Used space</div>
                            <span className="fw-bold">-41%</span>
                          </li>
                        </ul>
                      </div>

                      {/* Area Chart */}
                      <div
                        className="py-0"
                        style={{ height: "70px", margin: "0 -5px -5px;" }}
                      >
                        <OrdersChart />
                      </div>
                      {/* END : Area Chart */}
                    </div>
                    {/* END : Tile - HDD Usage */}
                  </div>

                  <div className="col-sm-6">
                    {/* Tile - Earnings */}
                    <div className="card bg-info text-white overflow-hidden mb-3">
                      <div className="p-3 pb-2">
                        <h5 className="mb-3">
                          <i className="demo-psi-coin text-reset text-opacity-75 fs-2 me-2" />{" "}
                          Ganhos
                        </h5>
                        <ul className="list-group list-group-borderless">
                          <li className="list-group-item p-0 text-reset d-flex justify-content-between align-items-start">
                            <div className="me-auto">Hoje</div>
                            <span className="fw-bold">R$ 302.924,68</span>
                          </li>
                          <li className="list-group-item p-0 text-reset d-flex justify-content-between align-items-start">
                            <div className="me-auto">Últimos 7 Dias</div>
                            <span className="fw-bold">R$ 1.332,00</span>
                          </li>
                        </ul>
                      </div>

                      {/* Line Chart */}
                      <div
                        className="py-0"
                        style={{ height: "70px", margin: "0 -5px -5px;" }}
                      >
                        {/* <canvas id="_dm-salesChart" /> */}
                        <EarningChart />
                      </div>
                      {/* END : Line Chart */}
                    </div>
                    {/* END : Tile - Earnings */}
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    {/* Tile - Sales */}
                    <div className="card bg-purple text-white overflow-hidden mb-3">
                      <div className="p-3 pb-2">
                        <h5 className="mb-3">
                          <i className="demo-psi-basket-coins text-reset text-opacity-75 fs-2 me-2" />{" "}
                          Vendas
                        </h5>
                        <ul className="list-group list-group-borderless">
                          <li className="list-group-item p-0 text-reset d-flex justify-content-between align-items-start">
                            <div className="me-auto">Hoje</div>
                            <span className="fw-bold">196</span>
                          </li>
                          <li className="list-group-item p-0 text-reset d-flex justify-content-between align-items-start">
                            <div className="me-auto">Últimos 7 Dias</div>
                            <span className="fw-bold">R$ 307</span>
                          </li>
                        </ul>
                      </div>

                      {/* Bar Chart */}
                      <div className="py-0" style={{ height: "70px" }}>
                        <SalesChart />
                      </div>
                      {/* END : Bar Chart */}
                    </div>
                    {/* END : Tile - Sales */}
                  </div>
                  <div className="col-sm-6">
                    {/* Tile - Task Progress */}
                    <div className="card bg-warning text-white overflow-hidden mb-3">
                      <div className="p-3 pb-2">
                        <h5 className="mb-3">
                          <i className="demo-psi-basket-coins text-reset text-opacity-75 fs-2 me-2" />{" "}
                          Canais de vendas
                        </h5>
                        <ul className="list-group list-group-borderless">
                          <li className="list-group-item p-0 text-reset d-flex justify-content-between align-items-start">
                            <div className="me-auto">jzacessorios</div>
                            <span className="fw-bold">34</span>
                          </li>
                          <li className="list-group-item p-0 text-reset d-flex justify-content-between align-items-start">
                            <div className="me-auto">jzfull</div>
                            <span className="fw-bold">79</span>
                          </li>
                          <li className="list-group-item p-0 text-reset d-flex justify-content-between align-items-start">
                            <div className="me-auto">jzacessorios</div>
                            <span className="fw-bold">79</span>
                          </li>
                        </ul>
                      </div>

                      {/* Horizontal Bar Chart */}
                      <div className="py-0 pb-2" style={{ height: "70px" }}>
                        <canvas id="_dm-taskChart" />
                      </div>
                      {/* END : Horizontal Bar Chart */}
                    </div>
                    {/* END : Tile - Task Progress */}
                  </div>
                </div>

                {/* Simple state widget */}
                <div className="card">
                  <div className="card-body text-center">
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0 p-3">
                        <div className="h3 display-3">95</div>
                        <span className="h6">Pesquisas</span>
                      </div>
                      <div className="flex-grow-1 text-center ms-3">
                        <p className="text-body-secondary">
                          Lorem ipsum dolor sit amet, consectetuer adipiscing
                          elit.
                        </p>
                        <button type="button" className="btn btn-sm btn-danger">
                          Ver Detahes
                        </button>

                        {/* Social media statistics */}
                        <div className="mt-4 pt-3 d-flex justify-content-around border-top">
                          <div className="text-center">
                            <h4 className="mb-1">1,345</h4>
                            <small className="text-body-secondary">
                              Following
                            </small>
                          </div>
                          <div className="text-center">
                            <h4 className="mb-1">23k</h4>
                            <small className="text-body-secondary">
                              Followers
                            </small>
                          </div>
                          <div className="text-center">
                            <h4 className="mb-1">278</h4>
                            <small className="text-body-secondary">Posts</small>
                          </div>
                        </div>
                        {/* END : Social media statistics */}
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- END : Simple state widget --> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </AuthWrapper>
  );
}
