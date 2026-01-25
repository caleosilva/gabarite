import { Model } from "mongoose";
import { BaseAction } from "../BaseAction/BaseAction";
import { AppError, HttpCode } from "../AppError/AppError";
import { Acao } from "@/commons/auth/config/acao";

interface EditarInput<T> {
  id: string;
  data: Partial<T>;
}

export class BaseActionEditar<T> extends BaseAction<EditarInput<T>, T> {
  protected recurso: string;
  protected acao = Acao.EDITAR.value;

  constructor(
    protected model: Model<T>,
    recurso: string,
  ) {
    super();
    this.recurso = recurso;
  }

  protected async validate(input: EditarInput<T>): Promise<void> {
    if (!input.id) throw new AppError(HttpCode.BAD_REQUEST, "ID é obrigatório para edição.");
  }

  protected async save(input: EditarInput<T>): Promise<T> {
    console.log("input: ", input);
    const registro = await this.model.findByIdAndUpdate(
      input.id,
      { $set: input.data },
      { new: true, runValidators: true }
    );

    if (!registro) throw new AppError(HttpCode.NOT_FOUND, "Registro não encontrado para edição.");
    return registro;
  }
}