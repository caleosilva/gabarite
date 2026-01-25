import { Model } from "mongoose";
import { BaseAction } from "../BaseAction/BaseAction";
import { AppError, HttpCode } from "../AppError/AppError";
import { Acao } from "@/commons/auth/config/acao";

export class BaseActionVisualizar<T> extends BaseAction<string, T> {
  protected recurso: string;
  protected acao = Acao.VISUALIZAR.value;

  constructor(
    protected model: Model<T>,
    recurso: string,
    protected selectFields: string | Record<string, number> = "",
  ) {
    super();
    this.recurso = recurso;
  }

  protected async validate(id: string): Promise<void> {
    if (!id) {
      throw new AppError(
        HttpCode.BAD_REQUEST,
        "ID não fornecido para visualização.",
      );
    }
  }

  protected async save(id: string): Promise<T> {
    // 1. Busca o registro garantindo que não foi excluído logicamente
    const registro = await this.model
      .findOne({ _id: id, excluido: false })
      .select(this.selectFields)
      .lean();

    // 2. Se não encontrar, lança 404 para o BaseRoute capturar
    if (!registro) {
      throw new AppError(HttpCode.NOT_FOUND, "Registro não encontrado.");
    }

    return registro as unknown as T;
  }
}
