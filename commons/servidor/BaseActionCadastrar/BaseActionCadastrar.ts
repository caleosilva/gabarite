import { Model } from "mongoose";
import { BaseAction } from "../BaseAction/BaseAction";
import { AppError, HttpCode } from "../AppError/AppError";
import { Acao } from "@/commons/auth/enum/acao";

export class BaseActionCadastrar<T> extends BaseAction<Partial<T>, T> {
  protected isPublic = false;
  protected recurso: string;
  protected acao = Acao.CADASTRAR.value;

  constructor(
    protected model: Model<T>,
    recurso: string,
    isPublic: boolean = false
  ) {
    super();
    this.recurso = recurso;
    this.isPublic = isPublic;
  }

  protected async validate(data: Partial<T>): Promise<void> {
    // Validação genérica
    if (!data || Object.keys(data).length === 0) {
      throw new AppError(HttpCode.BAD_REQUEST, "Dados para cadastro não fornecidos.");
    }
    
    // Dica: Aqui você poderia adicionar uma validação de Schema se quisesse
  }

  protected async save(data: Partial<T>): Promise<T> {
    // No Mongoose, o .create retorna um documento do tipo T
    const doc = await this.model.create(data);
    return doc.toObject() as T; 
  }
}