import { ColumnDef } from "@tanstack/react-table";
import {
  AbstractTableController,
  ResultadoPaginado,
  FiltroBusca,
  ConstrutorAcoesPadrao,
} from "@/commons/interface/AbstractTableController/AbstractTableController";
import { BancaType } from "@/models/Banca";
import { ErroUtil } from "@/utils/ErroUtil";

export class BancaController extends AbstractTableController<BancaType> {
  constructor(
    private actions: {
      onAdd: () => void;
      onEdit: (item: BancaType) => void;
      onView: (item: BancaType) => void;
      onDelete: (item: BancaType) => void;
    },
  ) {
    super();
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
      await ErroUtil.processarErroAPI(response, "Erro ao buscar bancas");
    }

    const data = await response.json();
    return data;
  }

  // Personalização dos botões
  configurarAcoesPadrao(builder: ConstrutorAcoesPadrao): void {
    builder.adicionar.definirRotulo("Nova Banca").definirVariante("default");
    builder.editar.definirRotulo("Editar Banca").definirVariante("outline");
  }

  // Mapeamento das ações
  aoClicarAdicionar() {
    this.actions.onAdd();
  }
  aoClicarEditar(item: BancaType) {
    this.actions.onEdit(item);
  }
  aoClicarVisualizar(item: BancaType) {
    this.actions.onView(item);
  }
  aoClicarExcluir(item: BancaType) {
    this.actions.onDelete(item);
  }
}
