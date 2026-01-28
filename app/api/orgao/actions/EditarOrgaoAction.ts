import { Model } from "mongoose";
import { BaseActionEditar } from "@/commons/servidor/BaseActionEditar/BaseActionEditar"; // Importando a sua base de edição
import { AppError, HttpCode } from "@/commons/servidor/AppError/AppError";
import { OrgaoType } from "@/models/Orgao";
import { Recurso } from "@/commons/auth/config/recurso";

export class EditarOrgaoAction extends BaseActionEditar<OrgaoType> {
  constructor(model: Model<OrgaoType>) {
    super(model, Recurso.ORGAO.value);
  }

  protected async validate(input: {
    id: string;
    data: Partial<OrgaoType>;
  }): Promise<void> {
    await super.validate(input);

    const { id, data } = input;

    if (!data.nome) {
      throw new AppError(
        HttpCode.BAD_REQUEST,
        "O nome do orgão é obrigatório."
      );
    }

    const orgaoExistente = await this.model
      .findOne({
        nome: { $regex: `^${data.nome}$`, $options: "i" },
        _id: { $ne: id },
        excluido: false,
      })
      .lean();

    if (orgaoExistente) {
      throw new AppError(
        HttpCode.CONFLICT,
        "Já existe um Orgão com este nome cadastrada no sistema."
      );
    }
  }

  protected async save(input: {id: string; data: Partial<OrgaoType>;}): Promise<OrgaoType> {
    return await super.save(input);
  }
}
