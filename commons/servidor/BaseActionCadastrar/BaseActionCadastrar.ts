import { Model } from "mongoose";
import { BaseAction } from "../BaseAction/BaseAction";
import { AppError, HttpCode } from "../AppError/AppError";

export class BaseActionCadastrar<T> extends BaseAction<Partial<T>, T> {
  constructor(protected model: Model<T>) {
    super();
  }

  protected async validate(data: Partial<T>): Promise<void> {
    // Validação genérica: verificar se os dados não estão vazios
    if (!data || Object.keys(data).length === 0) {
      throw new AppError(HttpCode.BAD_REQUEST, "Dados para cadastro não fornecidos.");
    }
  }

  protected async save(data: Partial<T>): Promise<T> {
    return await this.model.create(data);
  }
}