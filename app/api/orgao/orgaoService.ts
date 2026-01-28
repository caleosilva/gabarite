import { Orgao, OrgaoType } from "@/models/Orgao";
import { BaseService } from "@/commons/servidor/BaseService/BaseService";

import { BaseActionGoToPage, GoToPageInput } from "@/commons/servidor/BaseActionGoToPage/BaseActionGoToPage";
import { BaseActionExcluir } from "@/commons/servidor/BaseActionExcluir/BaseActionExcluir";
import { BaseActionVisualizar } from "@/commons/servidor/BaseActionVisualizar/BaseActionVisualizar";
import { Recurso } from "@/commons/auth/config/recurso";

import { CadastrarOrgaoAction } from "./actions/CadastrarOrgaoAction";
import { EditarOrgaoAction } from "./actions/EditarOrgaoAction";

export class OrgaoService extends BaseService<OrgaoType> {
    protected recurso = Recurso.ORGAO.value;
  

  // Utilizado no goToPage
  private readonly projecaoListagem: Partial<Record<keyof OrgaoType, number>> = {
    nome: 1,
  };
  
  async goToPage(params: GoToPageInput) {
    return new BaseActionGoToPage(Orgao, this.recurso, this.projecaoListagem).run(params);
  }

  async cadastrar(data: OrgaoType) {
    return new CadastrarOrgaoAction(Orgao).run(data);
  }

  async editar(id: string, data: Partial<OrgaoType>) {
    return new EditarOrgaoAction(Orgao).run({ id, data });
  }

  async excluir(id: string) {
    return new BaseActionExcluir(Orgao, this.recurso).run(id);
  }

  async visualizar(id: string) {
   return new BaseActionVisualizar(Orgao, this.recurso).run(id);
  }
}