import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import baseURL from "@/utils/config";
import axios from "axios";
// Interface para a resposta do login
interface LoginResponse {
  id: string;
  email: string;
  is_active: boolean;
  user_type: string;
  token: string;
}

// Interface personalizada para o usuário
interface CustomUser {
  id: string;
  email: string;
  is_active: boolean;
  user_type: string;
  token: string;
}

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/", // Redireciona para a página inicial ao invés de "/signIn"
    signOut: "/",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials) {
            console.log("Nenhuma credencial fornecida.");
            return null;
          }
          console.log("Enviando requisição de login...");
          const response = await axios.post<LoginResponse>(`${baseURL}/login`, {
            email: credentials.email,
            password: credentials.password,
          });

          if (response.status === 200 && response.data.token) {
            // Retorne um objeto que corresponda ao tipo User esperado
            console.log("response.data", response.data);
            console.log(
              "Login bem-sucedido, token recebido:",
              response.data.token,
            );
            const user: CustomUser = {
              id: response.data.id,
              email: response.data.email,
              is_active: response.data.is_active,
              user_type: response.data.user_type,
              token: response.data.token,
            };
            return user;
          } else {
            console.log("Falha no login ou token não recebido.");
            return null;
          }
        } catch (error) {
          console.error("Erro ao fazer login:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Incluindo user_type no token JWT
      if (user) {
        console.log("Usuário encontrado, adicionando dados ao token JWT...");
        token.id = user.id;
        token.user_type = user.user_type;
        token.is_active = user.is_active;
        token.token = user.token || "";
      }
      return token;
    },
    async session({ session, token }) {
      // Incluindo user_type na sessão
      session.user.id = token.id as string;
      session.user.user_type = token.user_type as string;
      session.user.is_active = token.is_active as boolean;
      session.user.token = token.token as string;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
