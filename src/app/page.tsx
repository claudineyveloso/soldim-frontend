"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoginPage from "@/login/page";
import Dashboard from "./dashboard/page";

export default function Home() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") {
      // Enquanto a sessão está carregando, você pode mostrar um loading spinner ou simplesmente não fazer nada
      return;
    }
  }, [status]);

  if (status === "loading") {
    // Aqui, você pode renderizar um loading spinner ou algo que indique que a sessão está sendo verificada
    return <div>Carregando...</div>;
  }

  // Se o usuário não estiver autenticado, renderiza a página de login
  if (!session) {
    return <LoginPage />;
  }

  // Renderiza o conteúdo da página principal se o usuário estiver autenticado
  return <Dashboard />;
}
