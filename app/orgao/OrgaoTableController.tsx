import { ColumnDef } from "@tanstack/react-table";
import {
  AbstractTableController,
  ResultadoPaginado,
  FiltroBusca,
  ConstrutorAcoesPadrao,
  TableActions,
} from "@/commons/interface/AbstractTableController/AbstractTableController";
import { OrgaoType } from "@/models/Orgao";
import { RecursoType } from "@/commons/auth/config/recurso";
import { CargoType } from "@/commons/auth/config/cargo";
import { possuiPermissao } from "@/commons/auth/possuiPermissao";
import { Acao } from "@/commons/auth/config/acao";

export class OrgaoTableController extends AbstractTableController<OrgaoType> {
  constructor(
    private cargo: CargoType["value"],
    private recurso: RecursoType["value"],
    actions: TableActions<OrgaoType>,
  ) {
    super(actions);
  }

  // Define as colunas que aparecerão na DataTable
  obterColunas(): ColumnDef<OrgaoType>[] {
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

  getRowId(item: OrgaoType): string {
    return item._id.toString();
  }

  // Integração com backend/API
  async fetchData(
    indicePagina: number,
    tamanhoPagina: number,
    filtro?: FiltroBusca,
  ): Promise<ResultadoPaginado<OrgaoType>> {
    const params = new URLSearchParams({
      page: (indicePagina + 1).toString(),
      limit: tamanhoPagina.toString(),
      ...(filtro?.value && {
        filterField: filtro.field,
        filterValue: filtro.value,
      }),
    });

    const response = await fetch(`/api/orgao?${params.toString()}`);

    if (!response.ok) {
      await super.tratarErro(response, "Erro ao buscar órgãos");
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
