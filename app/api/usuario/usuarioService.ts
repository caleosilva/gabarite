import Usuario, { UsuarioType } from "@/models/Usuario";
import { BaseService } from "@/commons/servidor/BaseService/BaseService";
import { BaseActionGoToPage, GoToPageInput } from "@/commons/servidor/BaseActionGoToPage/BaseActionGoToPage";
import { BaseActionCadastrar } from "@/commons/servidor/BaseActionCadastrar/BaseActionCadastrar";
import { BaseActionEditar } from "@/commons/servidor/BaseActionEditar/BaseActionEditar";
import { BaseActionExcluir } from "@/commons/servidor/BaseActionExcluir/BaseActionExcluir";
import { BaseActionVisualizar } from "@/commons/servidor/BaseActionVisualizar/BaseActionVisualizar";
import {CadastrarUsuarioAction} from "@/app/api/usuario/actions/ActionCadastrarUsuario"

export class UsuarioService extends BaseService<UsuarioType> {

  // Utilizado no goToPage
  private readonly projecaoListagem: Partial<Record<keyof UsuarioType, number>> = {
    nome: 1,
    email: 1,
    isAdmin: 1,
  };
  
  async goToPage(params: GoToPageInput) {
    return new BaseActionGoToPage(Usuario, this.projecaoListagem).run(params);
  }

  async cadastrar(data: UsuarioType) {
    return new CadastrarUsuarioAction(Usuario).run(data);
  }

  async editar(id: string, data: Partial<UsuarioType>) {
    return new BaseActionEditar(Usuario).run({ id, data });
  }

  async excluir(id: string) {
    return new BaseActionExcluir(Usuario).run(id);
  }

  async visualizar(id: string) {
   return new BaseActionVisualizar(Usuario, { senha: 0 }).run(id);
  }
}