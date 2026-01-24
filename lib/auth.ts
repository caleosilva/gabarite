import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from "@/utils/db";
import Usuario from "@/models/Usuario";
import { CryptoUtils } from "@/utils/CryptoUtils";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        senha: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.senha) return null;

        try {
          await connectToDatabase();
          const user = await Usuario.findOne({
            email: credentials.email,
            excluido: 0,
          }).select("_id nome email senha cargo");

          if (!user) return null;

          const senhaDecriptada = CryptoUtils.decryptWithAES(credentials.senha);
          const match = await CryptoUtils.comparePassword(
            senhaDecriptada,
            user.senha
          );

          if (match) {
            return {
              id: user._id.toString(),
              name: user.nome,
              email: user.email,
              cargo: user.cargo
            };
          }
          return null;
        } catch (error) {
          console.error("Erro no authorize:", error);
          return null;
        }
      },
    }),
  ],
  pages: { signIn: "/login", error: "/login" },
  session: { strategy: "jwt", maxAge: 6 * 60 * 60 },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.cargo = user.cargo;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user._id = token._id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.cargo = token.cargo;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};