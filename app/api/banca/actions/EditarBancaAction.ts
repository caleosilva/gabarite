import { Model } from "mongoose";
import { BaseActionEditar } from "@/commons/servidor/BaseActionEditar/BaseActionEditar"; // Importando a sua base de edição
import { AppError, HttpCode } from "@/commons/servidor/AppError/AppError";
import { BancaType } from "@/models/Banca";

export class EditarBancaAction extends BaseActionEditar<BancaType> {
  constructor(model: Model<BancaType>) {
    super(model);
  }

  protected async validate(input: {
    id: string;
    data: Partial<BancaType>;
  }): Promise<void> {
    await super.validate(input);

    const { id, data } = input;

    if (!data.nome) {
      throw new AppError(
        HttpCode.BAD_REQUEST,
        "O nome da banca é obrigatório."
      );
    }

    const bancaExistente = await this.model
      .findOne({
        nome: { $regex: `^${data.nome}$`, $options: "i" },
        _id: { $ne: id },
        excluido: false,
      })
      .lean();

    if (bancaExistente) {
      throw new AppError(
        HttpCode.CONFLICT,
        "Já existe uma Banca com este nome cadastrada no sistema."
      );
    }
  }

  protected async save(input: {id: string; data: Partial<BancaType>;}): Promise<BancaType> {
    return await super.save(input);
  }
}
