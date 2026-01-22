import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import {possuiPermissao} from "@/commons/auth/autenticador";

function proxy(request: NextRequestWithAuth) {
  const token = request.nextauth.token;
  const path = request.nextUrl.pathname;
  const method = request.method;

  const cargo = token?.cargo;

  // preciso mapear as páginas com os recursos // FIXMEEEEE

  if (token?.cargo != undefined){
      // possuiPermissao(token.cargo, path, method)

  }

  console.log(token)
  console.log(path)
  console.log(method)
  console.log(cargo)

  if (true)
    return NextResponse.redirect(new URL("/nao-autorizado", request.url));
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
    "/perfil/:path*",
  ],
};
