import { ColumnDef } from "@tanstack/react-table";
import {
  AbstractTableController,
  ResultadoPaginado,
  FiltroBusca,
  ConstrutorAcoesPadrao,
  TableActions,
} from "@/commons/interface/AbstractTableController/AbstractTableController";
import { DisciplinaType } from "@/models/Disciplina";
import { RecursoType } from "@/commons/auth/config/recurso";
import { CargoType } from "@/commons/auth/config/cargo";
import { possuiPermissao } from "@/commons/auth/possuiPermissao";
import { Acao } from "@/commons/auth/config/acao";

export class DisciplinaTableController extends AbstractTableController<DisciplinaType> {
  constructor(
    private cargo: CargoType["value"],
    private recurso: RecursoType["value"],
    actions: TableActions<DisciplinaType>,
  ) {
    super(actions);
  }

  // Define as colunas que aparecerão na DataTable
  obterColunas(): ColumnDef<DisciplinaType>[] {
    return [
      {
        accessorKey: "nome",
        header: "Nome",
      },
    ];
  }

  // Define os campos que aparecem no Select de busca da GenericPage
  obterCamposPesquisaveis() {
    return [{ label: "Nome", value: "nome" }];
  }

  getRowId(item: DisciplinaType): string {
    return item._id.toString();
  }

  // Integração com backend/API
  async fetchData(
    indicePagina: number,
    tamanhoPagina: number,
    filtro?: FiltroBusca,
  ): Promise<ResultadoPaginado<DisciplinaType>> {
    const params = new URLSearchParams({
      page: (indicePagina + 1).toString(),
      limit: tamanhoPagina.toString(),
      ...(filtro?.value && {
        filterField: filtro.field,
        filterValue: filtro.value,
      }),
    });

    const response = await fetch(`/api/disciplina?${params.toString()}`);

    if (!response.ok) {
      await super.tratarErro(response, "Erro ao buscar disciplinas");
    }

    const data = await response.json();
    return data;
  }

  // Personalização dos botões
  configurarAcoesPadrao(builder: ConstrutorAcoesPadrao): void {
    builder.adicionar
      .setRotulo(null)
      .setVisivel(
        possuiPermissao(this.cargo, this.recurso, Acao.CADASTRAR.value),
      );

    builder.editar
      .setRotulo(null)
      .setVisivel(possuiPermissao(this.cargo, this.recurso, Acao.EDITAR.value));

    builder.excluir
      .setRotulo(null)
      .setVisivel(
        possuiPermissao(this.cargo, this.recurso, Acao.EXCLUIR.value),
      );
      
    builder.visualizar.setRotulo(null).setVisivel(false);
  }
}
