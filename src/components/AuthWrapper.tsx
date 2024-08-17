"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "./header";
import NavBar from "./navbar";
import SideBar from "./sidebar";

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session && typeof window !== "undefined") {
      // Redireciona para a página de login apenas no lado do cliente
      router.push("/");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    // Retorna null para não renderizar nada até o redirecionamento ocorrer
    return null;
  }

  // Se autenticado, renderiza o layout completo
  return (
    <>
      <Header />
      <NavBar />
      <SideBar />
      {children}
    </>
  );
}
