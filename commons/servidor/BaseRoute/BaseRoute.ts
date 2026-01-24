import connectToDatabase from "@/utils/db";
import { AppError, HttpCode } from "../AppError/AppError";
import { NextResponse } from "next/server";

export abstract class BaseRoute {

  protected async handle(req: Request, method: string, action: Function) {
    try {
      await connectToDatabase();

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
          titulo: AppError.obterLabel(error.statusCode)
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
}

