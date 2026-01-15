import { Banca, BancaType} from "@/models/Banca";
import { BaseService } from "@/commons/servidor/BaseService/BaseService";

import { BaseActionGoToPage, GoToPageInput } from "@/commons/servidor/BaseActionGoToPage/BaseActionGoToPage";
import { BaseActionCadastrar } from "@/commons/servidor/BaseActionCadastrar/BaseActionCadastrar";
import { BaseActionEditar } from "@/commons/servidor/BaseActionEditar/BaseActionEditar";
import { BaseActionExcluir } from "@/commons/servidor/BaseActionExcluir/BaseActionExcluir";
import { BaseActionVisualizar } from "@/commons/servidor/BaseActionVisualizar/BaseActionVisualizar";

import { CadastrarBancaAction } from "./actions/CadastrarBancaAction";
import { EditarBancaAction } from "./actions/EditarBancaAction";



export class BancaService extends BaseService<BancaType> {

  // Utilizado no goToPage
  private readonly projecaoListagem: Partial<Record<keyof BancaType, number>> = {
    nome: 1,
  };
  
  async goToPage(params: GoToPageInput) {
    return new BaseActionGoToPage(Banca, this.projecaoListagem).run(params);
  }

  async cadastrar(data: BancaType) {
    return new CadastrarBancaAction(Banca).run(data);
  }

  async editar(id: string, data: Partial<BancaType>) {
    return new EditarBancaAction(Banca).run({ id, data });
  }

  async excluir(id: string) {
    return new BaseActionExcluir(Banca).run(id);
  }

  async visualizar(id: string) {
   return new BaseActionVisualizar(Banca).run(id);
  }
}