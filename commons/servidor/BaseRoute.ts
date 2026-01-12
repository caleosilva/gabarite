import connectToDatabase from "@/utils/db";
import { AppError, HttpCode } from "./AppError";
import { NextResponse } from "next/server";
import { Autenticador } from "../autenticador/Autenticador";


export abstract class BaseRoute {
  protected abstract service: any;
  protected abstract roles: Record<string, string[]>;

  protected async handle(req: Request, method: string, action: Function) {
    try {
      await connectToDatabase();
      
      const autorizado = await Autenticador.validar();
      if (!autorizado) throw new AppError(HttpCode.FORBIDDEN, "Não autorizado");

      const result = await action();
      return NextResponse.json(result);
    } catch (error) {
      return this.handleError(error);
    }
  }

  protected handleError(error: any) {
    console.error("API Error:", error);

    // Se for um erro conhecido (AppError), usamos os dados dele
    if (error instanceof AppError) {
      return NextResponse.json(
        { 
          msg: error.message, 
          code: error.statusCode,
          titulo: this.getTituloPorStatus(error.statusCode)
        }, 
        { status: error.statusCode }
      );
    }

    // Erros genéricos de runtime ou banco de dados
    return NextResponse.json(
      { 
        msg: "Ocorreu um erro interno no servidor.", 
        code: 500,
        titulo: "Erro Inesperado"
      }, 
      { status: 500 }
    );
  }

  private getTituloPorStatus(status: number): string {
    switch (status) {
      case 401: return "Não Autenticado";
      case 403: return "Acesso Negado";
      case 409: return "Conflito de Dados";
      case 404: return "Não Encontrado";
      default: return "Erro na Operação";
    }
  }
}

