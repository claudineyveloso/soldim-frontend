// types/next-auth.d.ts
// import NextAuth from "next-auth";
//
// declare module "next-auth" {
//   interface User {
//     id: string;
//     user_type: string;
//   }
//
//   interface Session {
//     user: {
//       id: string;
//       user_type: string;
//     } & DefaultSession["user"];
//   }
//
//   interface JWT {
//     id: string;
//     user_type: string;
//   }
// }

// types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    user_type: string;
    is_active: boolean;
    token: string;
  }

  interface Session {
    user: {
      id: string;
      user_type: string;
      is_active: boolean;
    } & DefaultSession["user"];
  }

  interface JWT {
    id: string;
    user_type: string;
    is_active: boolean;
  }
}
