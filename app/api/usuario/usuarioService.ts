import Usuario, { UsuarioType } from "@/models/Usuario";
import { BaseService } from "@/commons/servidor/BaseService/BaseService";
import { BaseActionGoToPage, GoToPageInput } from "@/commons/servidor/BaseActionGoToPage/BaseActionGoToPage";
import { BaseActionEditar } from "@/commons/servidor/BaseActionEditar/BaseActionEditar";
import { BaseActionExcluir } from "@/commons/servidor/BaseActionExcluir/BaseActionExcluir";
import { BaseActionVisualizar } from "@/commons/servidor/BaseActionVisualizar/BaseActionVisualizar";
import {CadastrarUsuarioAction} from "@/app/api/usuario/actions/ActionCadastrarUsuario"
import { Recurso } from "@/commons/auth/enum/recurso";

export class UsuarioService extends BaseService<UsuarioType> {
  protected recurso = Recurso.USUARIO.value;

  // Utilizado no goToPage
  private readonly projecaoListagem: Partial<Record<keyof UsuarioType, number>> = {
    nome: 1,
    email: 1,
    cargo: 1,
  };
  
  async goToPage(params: GoToPageInput) {
    return new BaseActionGoToPage(Usuario, this.recurso, this.projecaoListagem).run(params);
  }

  async cadastrar(data: UsuarioType, isPublic: boolean = false) {
    return new CadastrarUsuarioAction(Usuario, isPublic).run(data);
  }

  async editar(id: string, data: Partial<UsuarioType>) {
    return new BaseActionEditar(Usuario, this.recurso).run({ id, data });
  }

  async excluir(id: string) {
    return new BaseActionExcluir(Usuario, this.recurso).run(id);
  }

  async visualizar(id: string) {
   return new BaseActionVisualizar(Usuario, this.recurso, { senha: 0 }).run(id);
  }
}