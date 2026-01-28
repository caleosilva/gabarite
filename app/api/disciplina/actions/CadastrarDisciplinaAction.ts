import { Model } from "mongoose";
import { BaseActionCadastrar } from "@/commons/servidor/BaseActionCadastrar/BaseActionCadastrar";
import { AppError, HttpCode } from "@/commons/servidor/AppError/AppError";
import { Recurso } from "@/commons/auth/config/recurso";
import { DisciplinaType } from "@/models/Disciplina";

export class CadastrarDisciplinaAction extends BaseActionCadastrar<DisciplinaType> {
  constructor(model: Model<DisciplinaType>) {
    super(model, Recurso.DISCIPLINA.value);
  }

  protected async validate(data: Partial<DisciplinaType>): Promise<void> {
    // 1. Executa a validação básica da classe pai
    await super.validate(data);

    if (!data.nome) {
      throw new AppError(HttpCode.BAD_REQUEST, "O nome é obrigatório.");
    }

    const disciplinaExistente = await this.model.findOne({
      nome: { $regex: `^${data.nome}$`, $options: "i" },
      excluido: false
    }).lean();

    if (disciplinaExistente) {
      throw new AppError(
        HttpCode.CONFLICT,
        "Já existe uma Disciplina com o nome informado cadastrado no sistema."
      );
    }
  }
}