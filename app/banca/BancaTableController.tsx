import { ColumnDef } from "@tanstack/react-table";
import {
  AbstractTableController,
  ResultadoPaginado,
  FiltroBusca,
  ConstrutorAcoesPadrao,
  TableActions
} from "@/commons/interface/AbstractTableController/AbstractTableController";
import { BancaType } from "@/models/Banca";

export class BancaTableController extends AbstractTableController<BancaType> {
  constructor(actions: TableActions<BancaType>) {
      super(actions); 
    }

  // Define as colunas que aparecerão na DataTable
  obterColunas(): ColumnDef<BancaType>[] {
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

  getRowId(item: BancaType): string {
    return item._id.toString();
  }

  // Integração com backend/API
  async fetchData(
    indicePagina: number,
    tamanhoPagina: number,
    filtro?: FiltroBusca,
  ): Promise<ResultadoPaginado<BancaType>> {
    const params = new URLSearchParams({
      page: (indicePagina + 1).toString(),
      limit: tamanhoPagina.toString(),
      ...(filtro?.value && {
        filterField: filtro.field,
        filterValue: filtro.value,
      }),
    });

    const response = await fetch(`/api/banca?${params.toString()}`);

    if (!response.ok) {
      await super.tratarErro(response, "Erro ao buscar bancas");
    }

    const data = await response.json();
    return data;
  }

  // Personalização dos botões
  configurarAcoesPadrao(builder: ConstrutorAcoesPadrao): void {
    builder.adicionar.removerRotulo();
    builder.visualizar.ocultar();
    builder.editar.removerRotulo();
    builder.excluir.removerRotulo();
  }
}
