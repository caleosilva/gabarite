import { BaseService } from "@/commons/servidor/BaseService/BaseService";
import { Disciplina, DisciplinaType } from "@/models/Disciplina";
import { BaseActionGoToPage, GoToPageInput } from "@/commons/servidor/BaseActionGoToPage/BaseActionGoToPage";
import { BaseActionExcluir } from "@/commons/servidor/BaseActionExcluir/BaseActionExcluir";
import { BaseActionVisualizar } from "@/commons/servidor/BaseActionVisualizar/BaseActionVisualizar";
import { Recurso } from "@/commons/auth/config/recurso";
import { CadastrarDisciplinaAction } from "./actions/CadastrarDisciplinaAction";
import { EditarDisciplinaAction } from "./actions/EditarDisciplinaAction";

export class DisciplinaService extends BaseService<DisciplinaType> {
    protected recurso = Recurso.DISCIPLINA.value;
  

  // Utilizado no goToPage
  private readonly projecaoListagem: Partial<Record<keyof DisciplinaType, number>> = {
    nome: 1,
  };
  
  async goToPage(params: GoToPageInput) {
    return new BaseActionGoToPage(Disciplina, this.recurso, this.projecaoListagem).run(params);
  }

  async cadastrar(data: DisciplinaType) {
    return new CadastrarDisciplinaAction(Disciplina).run(data);
  }

  async editar(id: string, data: Partial<DisciplinaType>) {
    return new EditarDisciplinaAction(Disciplina).run({ id, data });
  }

  async excluir(id: string) {
    return new BaseActionExcluir(Disciplina, this.recurso).run(id);
  }

  async visualizar(id: string) {
   return new BaseActionVisualizar(Disciplina, this.recurso).run(id);
  }
}