// components/ClientScripts.tsx
"use client";

import { useEffect } from "react";
import Script from "next/script";

const ClientScripts = () => {
  useEffect(() => {
    const updateColorVars = () => {
      // Sua lógica para updatecolorvars
      console.log("Update color variables");
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", updateColorVars);
    } else {
      updateColorVars();
    }

    return () => {
      document.removeEventListener("DOMContentLoaded", updateColorVars);
    };
  }, []);

  return (
    <>
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
      <Script src="/assets/pages/dashboard-1.js" strategy="afterInteractive" />
    </>
  );
};

export default ClientScripts;
