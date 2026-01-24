export enum HttpCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}

export class AppError extends Error {
  constructor(public readonly statusCode: HttpCode, message: string) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }

  static obterLabel(statusCode: number): string {
    const labels: Record<number, string> = {
      400: "Requisição Inválida",
      401: "Não Autorizado",
      403: "Acesso Negado",
      404: "Não Encontrado",
      409: "Conflito de Dados",
      500: "Erro Interno",
    };

    return labels[statusCode] || "Erro Desconhecido";
  }
}