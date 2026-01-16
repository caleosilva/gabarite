import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", // Redireciona default quando não está logado
  },
});

export const config = {
  // Todas as rotas que PRECISAM de login
  matcher: [
    "/",
    "/dashboard/:path*",
    "/usuario/:path*",
    "/auxiliares/:path*",
    "/estudo/:path*",
  ],
};