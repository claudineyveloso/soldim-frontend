import NextAuth from "next-auth";
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    user_type: string;
    is_active: boolean;
    token?: string;
  }

  interface Session {
    user: {
      id: string;
      user_type: string;
      is_active: boolean;
      token?: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    id: string;
    user_type: string;
    is_active: boolean;
    token?: string;
  }
}
