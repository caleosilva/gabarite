import { Model } from "mongoose";
import { BaseAction } from "../BaseAction/BaseAction";
import { AppError, HttpCode } from "../AppError/AppError";

export class BaseActionVisualizar<T> extends BaseAction<string, T> {
  /**
   * @param model O Model do Mongoose
   * @param selectFields Campos para retornar ou excluir (ex: { senha: 0 })
   */
  constructor(
    protected model: Model<T>,
    protected selectFields: string | Record<string, number> = ""
  ) {
    super();
  }

  protected async validate(id: string): Promise<void> {
    if (!id) {
      throw new AppError(HttpCode.BAD_REQUEST, "ID não fornecido para visualização.");
    }
  }

  protected async save(id: string): Promise<T> {
    // 1. Busca o registro garantindo que não foi excluído logicamente
    const registro = await this.model.findOne({ _id: id, excluido: false })
      .select(this.selectFields)
      .lean();

    // 2. Se não encontrar, lança 404 para o BaseRoute capturar
    if (!registro) {
      throw new AppError(HttpCode.NOT_FOUND, "Registro não encontrado.");
    }

    return registro as unknown as T;
  }
}