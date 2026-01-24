import { HttpCode } from "@/commons/servidor/AppError/AppError";

interface ErrorInfo {
  titulo: string;
  msg: string;
}

const titulosPorStatusFallBack: Record<HttpCode, string> = {
  [HttpCode.BAD_REQUEST]: "Requisição Inválida",
  [HttpCode.UNAUTHORIZED]: "Não Autorizado",
  [HttpCode.FORBIDDEN]: "Acesso Negado",
  [HttpCode.NOT_FOUND]: "Não Encontrado",
  [HttpCode.CONFLICT]: "Conflito de Dados",
  [HttpCode.INTERNAL_SERVER_ERROR]: "Erro Interno",
};

export class ErroUtil {
  public static tratarErro(erro: any): ErrorInfo {
    if (erro.titulo && erro.msg) {
      return {
        titulo: erro.titulo,
        msg: erro.msg,
      };
    }

    // Fallback: se não tiver título, gera baseado no statusCode
    const statusCode = erro.statusCode as HttpCode;
    const titulo =
      statusCode && titulosPorStatusFallBack[statusCode]
        ? titulosPorStatusFallBack[statusCode]
        : "Erro de Carregamento";

    return {
      titulo,
      msg: erro.message || "Não foi possível sincronizar os dados.",
    };
  }

  public static async processarErroAPI(
    response: Response,
    mensagemPadrao: string = "Erro na requisição",
  ): Promise<never> {
    const errorData = await response.json().catch(() => null);

    const erro = new Error(
      errorData?.msg || errorData?.message || mensagemPadrao,
    );

    // Enriquece o erro com dados da API
    (erro as any).titulo = errorData?.titulo;
    (erro as any).code = errorData?.code;
    (erro as any).statusCode = errorData?.code;
    (erro as any).msg = errorData?.msg;

    throw erro;
  }
}
