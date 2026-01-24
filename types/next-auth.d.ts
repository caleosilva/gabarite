import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      cargo: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    cargo: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id: string;
    cargo: string;
  }
}