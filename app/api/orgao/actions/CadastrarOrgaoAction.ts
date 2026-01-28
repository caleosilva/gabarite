import { Model } from "mongoose";
import { BaseActionCadastrar } from "@/commons/servidor/BaseActionCadastrar/BaseActionCadastrar";
import { AppError, HttpCode } from "@/commons/servidor/AppError/AppError";
import { OrgaoType } from "@/models/Orgao";
import { Recurso } from "@/commons/auth/config/recurso";

export class CadastrarOrgaoAction extends BaseActionCadastrar<OrgaoType> {
  constructor(model: Model<OrgaoType>) {
    super(model, Recurso.ORGAO.value);
  }

  protected async validate(data: Partial<OrgaoType>): Promise<void> {
    // 1. Executa a validação básica da classe pai
    await super.validate(data);

    if (!data.nome) {
      throw new AppError(HttpCode.BAD_REQUEST, "O nome é obrigatório.");
    }

    const orgaoExistente = await this.model.findOne({
      nome: { $regex: `^${data.nome}$`, $options: "i" },
      excluido: false
    }).lean();

    if (orgaoExistente) {
      throw new AppError(
        HttpCode.CONFLICT,
        "Já existe um Orgão com o nome informado cadastrado no sistema."
      );
    }
  }

  protected async save(data: Partial<OrgaoType>): Promise<OrgaoType> {
    return await super.save(data);
  }
}