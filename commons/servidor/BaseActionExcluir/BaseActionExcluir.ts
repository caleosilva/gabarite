import { Model } from "mongoose";
import { BaseAction } from "../BaseAction/BaseAction";
import { AppError, HttpCode } from "../AppError/AppError";
import { Acao } from "@/commons/auth/enum/acao";

export class BaseActionExcluir<T> extends BaseAction<string, T> {
  protected recurso: string;
  protected acao = Acao.EXCLUIR.value;

  constructor(
    protected model: Model<T>,
    recurso: string,
  ) {
    super();
    this.recurso = recurso;
  }

  protected async validate(id: string): Promise<void> {
    if (!id) throw new AppError(HttpCode.BAD_REQUEST, "ID necessário para exclusão.");
  }

  protected async save(id: string): Promise<T> {
    const registro = await this.model.findByIdAndUpdate(
      id,
      { $set: { excluido: true } as any },
      { new: true }
    );

    if (!registro) throw new AppError(HttpCode.NOT_FOUND, "Registro não encontrado.");
    return registro;
  }
}