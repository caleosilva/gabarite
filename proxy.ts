import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import {possuiPermissao} from "@/commons/auth/autenticador";
import {ProxyUtil} from "@/utils/ProxyUtil";
import { Acao } from "./commons/auth/enum/acao";

function proxy(request: NextRequestWithAuth) {
  const token = request.nextauth.token;
  const path = request.nextUrl.pathname;

  const cargo = token?.cargo as string;
  const recurso = ProxyUtil.obterRecursoPorPath(path);

  console.log("cargo", cargo);
  console.log("recurso", recurso);

  if (!possuiPermissao(cargo, recurso, Acao.LISTAR.value))
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
