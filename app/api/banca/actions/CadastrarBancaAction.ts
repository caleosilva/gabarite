import { Model } from "mongoose";
import { BaseActionCadastrar } from "@/commons/servidor/BaseActionCadastrar/BaseActionCadastrar";
import { AppError, HttpCode } from "@/commons/servidor/AppError/AppError";
import { BancaType} from "@/models/Banca";
import { Recurso } from "@/commons/auth/config/recurso";

export class CadastrarBancaAction extends BaseActionCadastrar<BancaType> {
  constructor(model: Model<BancaType>) {
    super(model, Recurso.BANCA.value);
  }

  protected async validate(data: Partial<BancaType>): Promise<void> {
    // 1. Executa a validação básica da classe pai
    await super.validate(data);

    if (!data.nome) {
      throw new AppError(HttpCode.BAD_REQUEST, "O e-mail é obrigatório.");
    }

    const bancaExistente = await this.model.findOne({
      nome: { $regex: `^${data.nome}$`, $options: "i" },
      excluido: false
    }).lean();

    if (bancaExistente) {
      throw new AppError(
        HttpCode.CONFLICT,
        "Já existe uma Banca com o nome informado cadastrado no sistema."
      );
    }
  }

  protected async save(data: Partial<BancaType>): Promise<BancaType> {
    return await super.save(data);
  }
}