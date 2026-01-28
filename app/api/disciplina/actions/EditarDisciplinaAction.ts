import { Model } from "mongoose";
import { BaseActionEditar } from "@/commons/servidor/BaseActionEditar/BaseActionEditar"; // Importando a sua base de edição
import { AppError, HttpCode } from "@/commons/servidor/AppError/AppError";
import { Recurso } from "@/commons/auth/config/recurso";
import { DisciplinaType } from "@/models/Disciplina";

export class EditarDisciplinaAction extends BaseActionEditar<DisciplinaType> {
  constructor(model: Model<DisciplinaType>) {
    super(model, Recurso.DISCIPLINA.value);
  }

  protected async validate(input: {
    id: string;
    data: Partial<DisciplinaType>;
  }): Promise<void> {
    await super.validate(input);

    const { id, data } = input;

    if (!data.nome) {
      throw new AppError(
        HttpCode.BAD_REQUEST,
        "O nome da disciplina é obrigatório."
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
        "Já existe uma Disciplina com este nome cadastrada no sistema."
      );
    }
  }
}
