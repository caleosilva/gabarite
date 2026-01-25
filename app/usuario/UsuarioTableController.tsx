import { ColumnDef } from "@tanstack/react-table";
import {
  AbstractTableController,
  ResultadoPaginado,
  FiltroBusca,
  ConstrutorAcoesPadrao,
  TableActions
} from "@/commons/interface/AbstractTableController/AbstractTableController";
import { UsuarioType } from "@/models/Usuario";
import { Badge } from "@/components/ui/badge";
import { getCargoByValue, CargoType } from "@/commons/auth/enum/cargo";


export class UsuarioController extends AbstractTableController<UsuarioType> {
  constructor(actions: TableActions<UsuarioType>) {
    super(actions); 
  }

  // Define as colunas que aparecerão na DataTable
  obterColunas(): ColumnDef<UsuarioType>[] {
    return [
      {
        accessorKey: "nome",
        header: "Nome",
      },
      {
        accessorKey: "email",
        header: "E-mail",
      },
      {
        accessorKey: "cargo",
        header: "Perfil",
        cell: ({ row }) => {
          const cargoValue = row.original.cargo;

          const config = getCargoByValue(cargoValue);

          return (
            <Badge variant={config?.variant ?? "outline"}>
              {config?.label ?? "Não Definido"}
            </Badge>
          );
        },
      },
    ];
  }

  // Define os campos que aparecem no Select de busca da GenericPage
  obterCamposPesquisaveis() {
    return [
      { label: "Nome", value: "nome" },
      { label: "E-mail", value: "email" },
    ];
  }

  getRowId(item: UsuarioType): string {
    return item._id.toString();
  }

  // Integração com backend/API
  async fetchData(
    indicePagina: number,
    tamanhoPagina: number,
    filtro?: FiltroBusca,
  ): Promise<ResultadoPaginado<UsuarioType>> {
    const params = new URLSearchParams({
      page: (indicePagina + 1).toString(),
      limit: tamanhoPagina.toString(),
      ...(filtro?.value && {
        filterField: filtro.field,
        filterValue: filtro.value,
      }),
    });

    const response = await fetch(`/api/usuario?${params.toString()}`);

    if (!response.ok) {
      await super.tratarErro(response, "Erro ao buscar usuários");
    }

    const data = await response.json();
    return data;
  }

  // Personalização dos botões usando o ConstrutorBotao que você enviou
  configurarAcoesPadrao(builder: ConstrutorAcoesPadrao): void {
    builder.adicionar.removerRotulo();
    builder.editar.removerRotulo();
    builder.excluir.removerRotulo();
    builder.visualizar.removerRotulo();
  }
}
