"use client"; // Marcar como Client Component

import Script from "next/script";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/nifty.min.css";
import "../../assets/css/custom.css";
import "../../assets/css/demo-purpose/demo-icons.min.css";
import "../../assets/css/demo-purpose/demo-settings.min.css";
import "../../assets/premium/icon-sets/line-icons/premium-line-icons.min.css";
import "../../assets/css/dropzone.min.css";
import "../../assets/vendors/spinkit/spinkit.min.css";

import { SessionProvider, useSession } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-bs-theme="light" data-scheme="gray">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&family=Ubuntu:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="out-quart">
        <SessionProvider>
          <div id="root" className="root mn--max tm--expanded-hd">
            {children}
          </div>
          <ToastContainer />
          <div className="scroll-container">
            <a
              href="#root"
              className="scroll-page ratio ratio-1x1"
              aria-label="Scroll button"
            >
              <span className="visually-hidden">Scroll to top</span>
            </a>
          </div>
          <div id="_dm-offcanvas" className="offcanvas" tabIndex={-1}>
            <div className="offcanvas-header">
              <h5 className="offcanvas-title">Offcanvas Header</h5>
              <button
                type="button"
                className="btn-close btn-lg text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              />
            </div>
          </div>
          <Script
            src="/assets/vendors/popperjs/popper.min.js"
            strategy="beforeInteractive"
          />
          <Script
            src="/assets/vendors/bootstrap/bootstrap.min.js"
            strategy="beforeInteractive"
          />
          <Script src="/assets/js/nifty.js" strategy="afterInteractive" />
          <Script
            src="/assets/js/demo-purpose-only.js"
            strategy="afterInteractive"
          />
          <Script
            src="/assets/vendors/chart.js/chart.umd.min.js"
            strategy="afterInteractive"
          />
          <Script
            src="/assets/vendors/dropzone/dropzone-min.js"
            strategy="afterInteractive"
          />
          <Script
            src="/assets/pages/dashboard-1.js"
            strategy="beforeInteractive"
          />
          <Script
            src="/assets/pages/file-uploads.js"
            strategy="beforeInteractive"
          />
        </SessionProvider>
      </body>
    </html>
  );
}
