import { withAuth } from "next-auth/middleware";
import { NextRequest } from "next/server";

function proxy(request: NextRequest) {
}

export default withAuth(proxy, {
  pages: {
    signIn: "/login", // redireciona quando não está logado
  },
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/banca/:path*",
    "/concurso/:path*",
    "/disciplina/:path*",
    "/orgao/:path*",
    "/questao/:path*",
    "/usuario/:path*",
    "/estudo/:path*",
    "/perfil/:path",
  ],
};
