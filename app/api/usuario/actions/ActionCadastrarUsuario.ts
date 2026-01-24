import { Model } from "mongoose";
import { BaseActionCadastrar } from "@/commons/servidor/BaseActionCadastrar/BaseActionCadastrar";
import { AppError, HttpCode } from "@/commons/servidor/AppError/AppError";
import { UsuarioType } from "@/models/Usuario";
import {CryptoUtils} from "@/utils/CryptoUtils"
import { Acao } from "@/commons/auth/enum/acao";
import { Recurso } from "@/commons/auth/enum/recurso";

export class CadastrarUsuarioAction extends BaseActionCadastrar<UsuarioType> {
  constructor(model: Model<UsuarioType>) {
    super(model, Recurso.USUARIO.value);
  }

  protected async validate(data: Partial<UsuarioType>): Promise<void> {
    // 1. Executa a validação básica da classe pai
    await super.validate(data);

    if (!data.email) {
      throw new AppError(HttpCode.BAD_REQUEST, "O e-mail é obrigatório.");
    }

    // 2. Busca se já existe um usuário (não excluído) com este e-mail
    const usuarioExistente = await this.model.findOne({ 
      email: data.email.toLowerCase(),
      excluido: false 
    }).lean();

    if (usuarioExistente) {
      throw new AppError(
        HttpCode.CONFLICT,
        "Este e-mail já está cadastrado no sistema."
      );
    }
  }

  protected async save(data: Partial<UsuarioType>): Promise<UsuarioType> {
    const payload = { ...data };

    if (payload.senha) {
      payload.senha = await CryptoUtils.hashPassword(payload.senha);
    }

    return await super.save(payload);
  }
}