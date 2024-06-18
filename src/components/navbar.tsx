import Image from "next/image";
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
                src="/assets/img/profile-photos/1.png"
                alt="Soldim Logo"
                width={123}
                height={123}
              />
            </div>
            <div className="mininav-content collapse d-mn-max">
              <span data-popper-arrow className="arrow"></span>
              <div className="d-grid">
                <button
                  className="mainnav-widget-toggle d-block btn border-0 p-2"
                  data-bs-toggle="collapse"
                  data-bs-target="#usernav"
                  aria-expanded="false"
                  aria-controls="usernav"
                >
                  <span className="dropdown-toggle d-flex justify-content-center align-items-center">
                    <h5 className="mb-0 me-3">Aaron Chavez</h5>
                  </span>
                  <small className="text-body-secondary">Administrator</small>
                </button>
                <div id="usernav" className="nav flex-column collapse">
                  <a
                    href="#"
                    className="nav-link d-flex justify-content-between align-items-center"
                  >
                    <span>
                      <i className="demo-pli-mail fs-5 me-2"></i>
                      <span className="ms-1">Messages</span>
                    </span>
                    <span className="badge bg-danger rounded-pill">14</span>
                  </a>
                  <a href="#" className="nav-link">
                    <i className="demo-pli-male fs-5 me-2"></i>
                    <span className="ms-1">Profile</span>
                  </a>
                  <a href="#" className="nav-link">
                    <i className="demo-pli-gear fs-5 me-2"></i>
                    <span className="ms-1">Settings</span>
                  </a>
                  <a href="#" className="nav-link">
                    <i className="demo-pli-computer-secure fs-5 me-2"></i>
                    <span className="ms-1">Lock screen</span>
                  </a>
                  <a href="#" className="nav-link">
                    <i className="demo-pli-unlock fs-5 me-2"></i>
                    <span className="ms-1">Logout</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="mainnav__categoriy py-3">
            <h6 className="mainnav__caption mt-0 fw-bold">Navigation</h6>
            <ul className="mainnav__menu nav flex-column">
              <li className="nav-item has-sub">
                <a href="#" className="mininav-toggle nav-link active">
                  <i className="demo-pli-home fs-5 me-2"></i>
                  <span className="nav-label ms-1">Dashboard</span>
                </a>
                <ul className="mininav-content nav collapse">
                  <li data-popper-arrow className="arrow"></li>
                  <li className="nav-item">
                    <a href="./index.html" className="nav-link active">
                      Dashboard 1
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./dashboard-2.html" className="nav-link">
                      Dashboard 2
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./dashboard-3.html" className="nav-link">
                      Dashboard 3
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item has-sub">
                <a href="#" className="mininav-toggle nav-link collapsed">
                  <i className="demo-pli-split-vertical-2 fs-5 me-2"></i>
                  <span className="nav-label ms-1">Layouts</span>
                </a>
                <ul className="mininav-content nav collapse">
                  <li data-popper-arrow className="arrow"></li>
                  <li className="nav-item">
                    <a
                      href="./layouts-mini-navigation.html"
                      className="nav-link"
                    >
                      Mini Navigation
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="./layouts-push-navigation.html"
                      className="nav-link"
                    >
                      Push Navigation
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="./layouts-slide-navigation.html"
                      className="nav-link"
                    >
                      Slide Navigation
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="./layouts-reveal-navigation.html"
                      className="nav-link"
                    >
                      Reveal Navigation
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./layouts-stuck-sidebar.html" className="nav-link">
                      Stuck Sidebar
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="./layouts-pinned-sidebar.html"
                      className="nav-link"
                    >
                      Pinned Sidebar
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./layouts-unite-sidebar.html" className="nav-link">
                      Unite Sidebar
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./layouts-sticky-header.html" className="nav-link">
                      Sticky Header
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="./layouts-sticky-navigation.html"
                      className="nav-link"
                    >
                      Sticky Navigation
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a href="./widgets.html" className="nav-link mininav-toggle">
                  <i className="demo-pli-gear fs-5 me-2"></i>
                  <span className="nav-label mininav-content ms-1">
                    <span data-popper-arrow className="arrow"></span>
                    Widgets
                  </span>
                </a>
              </li>
            </ul>
          </div>
          <div className="mainnav__categoriy py-3">
            <h6 className="mainnav__caption mt-0 fw-bold">Components</h6>
            <ul className="mainnav__menu nav flex-column">
              <li className="nav-item has-sub">
                <a href="#" className="mininav-toggle nav-link collapsed">
                  <i className="demo-pli-boot-2 fs-5 me-2"></i>
                  <span className="nav-label ms-1">Ui Elements</span>
                </a>
                <ul className="mininav-content nav collapse">
                  <li data-popper-arrow className="arrow"></li>
                  <li className="nav-item">
                    <a href="./ui-elements-buttons.html" className="nav-link">
                      Buttons
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./ui-elements-cards.html" className="nav-link">
                      Cards
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./ui-elements-dropdowns.html" className="nav-link">
                      Dropdowns
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="./ui-elements-components.html"
                      className="nav-link"
                    >
                      Components
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="./ui-elements-list-group.html"
                      className="nav-link"
                    >
                      List Group
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="./ui-elements-typography.html"
                      className="nav-link"
                    >
                      Typography
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./ui-elements-modals.html" className="nav-link">
                      Modals
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./ui-elements-progress.html" className="nav-link">
                      Progress
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="./ui-elements-placeholders.html"
                      className="nav-link d-flex align-items-center"
                    >
                      Placeholders
                      <span className="badge bg-danger ms-auto">NEW</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="./ui-elements-tabs-and-accordions.html"
                      className="nav-link"
                    >
                      Tabs &amp; Accordions
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="./ui-elements-tooltips-and-popover.html"
                      className="nav-link"
                    >
                      Tooltips &amp; Popover
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item has-sub">
                <a href="#" className="mininav-toggle nav-link collapsed">
                  <i className="demo-pli-pen-5 fs-5 me-2"></i>
                  <span className="nav-label ms-1">Forms</span>
                </a>
                <ul className="mininav-content nav collapse">
                  <li data-popper-arrow className="arrow"></li>
                  <li className="nav-item">
                    <a href="./forms-general.html" className="nav-link">
                      General
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./forms-tags.html" className="nav-link">
                      Tags
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="./forms-date-time-picker.html"
                      className="nav-link"
                    >
                      Date Time Picker
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./forms-validation.html" className="nav-link">
                      Validation
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./forms-wizard.html" className="nav-link">
                      Wizard
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./forms-file-uploads.html" className="nav-link">
                      File Uploads
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./forms-text-editor.html" className="nav-link">
                      Text Editor
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item has-sub">
                <a href="#" className="mininav-toggle nav-link collapsed">
                  <i className="demo-pli-receipt-4 fs-5 me-2"></i>
                  <span className="nav-label ms-1">Tables</span>
                </a>
                <ul className="mininav-content nav collapse">
                  <li data-popper-arrow className="arrow"></li>
                  <li className="nav-item">
                    <a href="./tables-static-tables.html" className="nav-link">
                      Static Tables
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./tables-gridjs.html" className="nav-link">
                      Gridjs
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./tables-tabulator.html" className="nav-link">
                      Tabulator
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item has-sub">
                <a href="#" className="mininav-toggle nav-link collapsed">
                  <i className="demo-pli-bar-chart fs-5 me-2"></i>
                  <span className="nav-label ms-1">Charts</span>
                </a>
                <ul className="mininav-content nav collapse">
                  <li data-popper-arrow className="arrow"></li>
                  <li className="nav-item">
                    <a href="./charts-chartjs.html" className="nav-link">
                      ChartJS
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./charts-chartscss.html" className="nav-link">
                      ChartsCSS
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./charts-sparklines.html" className="nav-link">
                      Sparklines
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item has-sub">
                <a href="#" className="mininav-toggle nav-link collapsed">
                  <i className="demo-pli-repair fs-5 me-2"></i>
                  <span className="nav-label ms-1">Miscellaneous</span>
                </a>
                <ul className="mininav-content nav collapse">
                  <li data-popper-arrow className="arrow"></li>
                  <li className="nav-item">
                    <a
                      href="./miscellaneous-timeline.html"
                      className="nav-link"
                    >
                      Timeline
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="./miscellaneous-loader.css.html"
                      className="nav-link"
                    >
                      Loader.CSS
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./miscellaneous-spinkit.html" className="nav-link">
                      Spinkit
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="./miscellaneous-clipboard.html"
                      className="nav-link"
                    >
                      Clipboard
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="mainnav__categoriy py-3">
            <h6 className="mainnav__caption mt-0 fw-bold">More</h6>
            <ul className="mainnav__menu nav flex-column">
              <li className="nav-item has-sub">
                <a href="#" className="mininav-toggle nav-link collapsed">
                  <i className="demo-pli-computer-secure fs-5 me-2"></i>
                  <span className="nav-label ms-1">App Views</span>
                </a>
                <ul className="mininav-content nav collapse">
                  <li data-popper-arrow className="arrow"></li>
                  <li className="nav-item">
                    <a
                      href="./app-views-file-manager.html"
                      className="nav-link"
                    >
                      File Manager
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./app-views-users.html" className="nav-link">
                      Users
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./app-views-users-2.html" className="nav-link">
                      Users 2
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./app-views-profile.html" className="nav-link">
                      Profile
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./app-views-calendar.html" className="nav-link">
                      Calendar
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./app-views-taskboard.html" className="nav-link">
                      Taskboard
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./app-views-chat.html" className="nav-link">
                      Chat
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./app-views-contact-us.html" className="nav-link">
                      Contact Us
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item has-sub">
                <a href="#" className="mininav-toggle nav-link collapsed">
                  <i className="demo-pli-speech-bubble-5 fs-5 me-2"></i>
                  <span className="nav-label ms-1">Blog Apps</span>
                </a>
                <ul className="mininav-content nav collapse">
                  <li data-popper-arrow className="arrow"></li>
                  <li className="nav-item">
                    <a href="./blog-apps-blog.html" className="nav-link">
                      Blog
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./blog-apps-blog-list.html" className="nav-link">
                      Blog List
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./blog-apps-blog-list-2.html" className="nav-link">
                      Blog List 2
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="./blog-apps-blog-article.html"
                      className="nav-link"
                    >
                      Blog Article
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="./blog-apps-manage-posts.html"
                      className="nav-link"
                    >
                      Manage Posts
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="./blog-apps-add-edit-posts.html"
                      className="nav-link"
                    >
                      Add Edit Posts
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item has-sub">
                <a href="#" className="mininav-toggle nav-link collapsed">
                  <i className="demo-pli-mail fs-5 me-2"></i>
                  <span className="nav-label ms-1">Email</span>
                </a>
                <ul className="mininav-content nav collapse">
                  <li data-popper-arrow className="arrow"></li>
                  <li className="nav-item">
                    <a href="./email-inbox.html" className="nav-link">
                      Inbox
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./email-view-message.html" className="nav-link">
                      View Message
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./email-compose-message.html" className="nav-link">
                      Compose Message
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item has-sub">
                <a href="#" className="mininav-toggle nav-link collapsed">
                  <i className="demo-pli-file-html fs-5 me-2"></i>
                  <span className="nav-label ms-1">Other Pages</span>
                </a>
                <ul className="mininav-content nav collapse">
                  <li data-popper-arrow className="arrow"></li>
                  <li className="nav-item">
                    <a
                      href="./other-pages-blank-page.html"
                      className="nav-link"
                    >
                      Blank Page
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./other-pages-invoice.html" className="nav-link">
                      Invoice
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="./other-pages-search-results.html"
                      className="nav-link"
                    >
                      Search Results
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./other-pages-faq.html" className="nav-link">
                      FAQ
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="./other-pages-pricing-tables.html"
                      className="nav-link"
                    >
                      Pricing Tables
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./other-pages-error-404.html" className="nav-link">
                      Error 404
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./other-pages-error-500.html" className="nav-link">
                      Error 500
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item has-sub">
                <a href="#" className="mininav-toggle nav-link collapsed">
                  <i className="demo-pli-window-2 fs-5 me-2"></i>
                  <span className="nav-label ms-1">Front Pages</span>
                </a>
                <ul className="mininav-content nav collapse">
                  <li data-popper-arrow className="arrow"></li>
                  <li className="nav-item">
                    <a href="./front-pages-error-404.html" className="nav-link">
                      Error 404
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./front-pages-error-500.html" className="nav-link">
                      Error 500
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="./front-pages-maintenance.html"
                      className="nav-link"
                    >
                      Maintenance
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./front-pages-login.html" className="nav-link">
                      Login
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./front-pages-register.html" className="nav-link">
                      Register
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="./front-pages-password-reminder.html"
                      className="nav-link"
                    >
                      Password Reminder
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="./front-pages-lock-screen.html"
                      className="nav-link"
                    >
                      Lock Screen
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item has-sub">
                <a href="#" className="mininav-toggle nav-link collapsed">
                  <i className="demo-pli-tactic fs-5 me-2"></i>
                  <span className="nav-label ms-1">Menu Levels</span>
                </a>
                <ul className="mininav-content nav collapse">
                  <li data-popper-arrow className="arrow"></li>
                  <li className="nav-item">
                    <a href="#" className="nav-link">
                      Menu Link
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link">
                      Menu Link
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link">
                      Menu Link
                    </a>
                  </li>
                  <li className="nav-item has-sub">
                    <a href="#" className="mininav-toggle nav-link collapsed">
                      Submenu
                    </a>
                    <ul className="mininav-content nav collapse">
                      <li data-popper-arrow className="arrow"></li>
                      <li className="nav-item">
                        <a href="#" className="nav-link">
                          Menu Link
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#" className="nav-link">
                          Menu Link
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#" className="nav-link">
                          Menu Link
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#" className="nav-link">
                          Menu Link
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item has-sub">
                    <a href="#" className="mininav-toggle nav-link collapsed">
                      Submenu
                    </a>
                    <ul className="mininav-content nav collapse">
                      <li data-popper-arrow className="arrow"></li>
                      <li className="nav-item">
                        <a href="#" className="nav-link">
                          Menu Link
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#" className="nav-link">
                          Menu Link
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#" className="nav-link">
                          Menu Link
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#" className="nav-link">
                          Menu Link
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="mainnav__categoriy py-3">
            <h6 className="mainnav__caption mt-0 fw-bold">Extras</h6>
            <ul className="mainnav__menu nav flex-column">
              <li className="nav-item has-sub">
                <a href="#" className="mininav-toggle nav-link collapsed">
                  <i className="demo-pli-happy fs-5 me-2"></i>
                  <span className="nav-label ms-1">Icons Pack</span>
                </a>
                <ul className="mininav-content nav collapse">
                  <li data-popper-arrow className="arrow"></li>
                  <li className="nav-item">
                    <a href="./icons-pack-ionicons.html" className="nav-link">
                      Ionicons
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="./icons-pack-themify-icons.html"
                      className="nav-link"
                    >
                      Themify Icons
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./icons-pack-flag-icons.html" className="nav-link">
                      Flag Icons
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="./icons-pack-weather-icons.html"
                      className="nav-link"
                    >
                      Weather Icons
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item has-sub">
                <a href="#" className="mininav-toggle nav-link collapsed">
                  <i className="demo-pli-medal-2 fs-5 me-2"></i>
                  <span className="nav-label ms-1">Premium Icons</span>
                </a>
                <ul className="mininav-content nav collapse">
                  <li data-popper-arrow className="arrow"></li>
                  <li className="nav-item">
                    <a
                      href="./premium-icons-line-icons-pack.html"
                      className="nav-link"
                    >
                      Line Icons Pack
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="./premium-icons-solid-icons-pack.html"
                      className="nav-link"
                    >
                      Solid Icons Pack
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item has-sub">
                <a href="#" className="mininav-toggle nav-link collapsed">
                  <i className="demo-pli-love fs-5 me-2"></i>
                  <span className="nav-label ms-1">Helper Classes</span>
                </a>
                <ul className="mininav-content nav collapse">
                  <li data-popper-arrow className="arrow"></li>
                  <li className="nav-item">
                    <a
                      href="./helper-classNamees-background.html"
                      className="nav-link"
                    >
                      Background
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="./helper-classNamees-link.html"
                      className="nav-link"
                    >
                      Link
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="./helper-classNamees-text.html"
                      className="nav-link"
                    >
                      Text
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="./helper-classNamees-borders.html"
                      className="nav-link"
                    >
                      Borders
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="./helper-classNamees-images.html"
                      className="nav-link"
                    >
                      Images
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="./helper-classNamees-sizing.html"
                      className="nav-link"
                    >
                      Sizing
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="./helper-classNamees-more.html"
                      className="nav-link"
                    >
                      More
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="mainnav__widget">
            <div className="mininav-toggle text-center py-2 d-mn-min">
              <i className="demo-pli-monitor-2"></i>
            </div>
            <div className="d-mn-max mt-5"></div>
            <div className="mininav-content collapse d-mn-max">
              <span data-popper-arrow className="arrow"></span>
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
                <a href="#" className="btn btn-sm btn-success">
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
                href="#"
                className="nav-link mininav-toggle collapsed"
                aria-expanded="false"
              >
                <i className="demo-pli-unlock fs-5 me-2"></i>
                <span className="nav-label ms-1">Logout</span>
              </a>
              <ul className="mininav-content nav flex-column collapse">
                <li data-popper-arrow className="arrow"></li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    This device only
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    All Devices
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link disabled"
                    href="#"
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
