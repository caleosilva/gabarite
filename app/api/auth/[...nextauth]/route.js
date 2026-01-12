import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from '@/utils/db';
import Usuario from "@/models/Usuario";
import { CryptoUtils } from "@/utils/CryptoUtils";

const authOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                senha: { label: "Senha", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.senha) {
                    return null;
                }
                
                try {
                    await connectToDatabase();
                    
                    const user = await Usuario.findOne({ 
                        email: credentials.email, 
                        excluido: 0 
                    });
                    
                    if (!user) {
                        return null;
                    }
                    
                    const senhaDecriptada = CryptoUtils.decryptWithAES(credentials.senha);
                    const match = await CryptoUtils.comparePassword(senhaDecriptada, user.senha);
                    
                    if (match) {
                        return {
                            id: user._id.toString(),
                            name: user.nome,
                            email: user.email,
                            isAdmin: user.isAdmin || false,
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
    pages: {
        signIn: "/login",
        error: "/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 6 * 60 * 60, // 6 horas
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.isAdmin = user.isAdmin;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user._id = token._id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.isAdmin = token.isAdmin;
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };