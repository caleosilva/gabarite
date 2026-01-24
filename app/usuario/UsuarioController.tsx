import { ColumnDef } from "@tanstack/react-table";
import {
  AbstractTableController,
  ResultadoPaginado,
  FiltroBusca,
  ConstrutorAcoesPadrao,
} from "@/commons/interface/AbstractTableController/AbstractTableController";
import { UsuarioType } from "@/models/Usuario";
import { Badge } from "@/components/ui/badge";
import { getCargoByValue, CargoType } from "@/commons/auth/enum/cargo";

export class UsuarioController extends AbstractTableController<UsuarioType> {
  constructor(
    private actions: {
      onAdd: () => void;
      onEdit: (item: UsuarioType) => void;
      onView: (item: UsuarioType) => void;
      onDelete: (item: UsuarioType) => void;
    },
  ) {
    super();
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
      const errorData = await response.json().catch(() => null);

      // 2. Extrai a mensagem específica ou define a genérica
      const mensagemDeErro =
        errorData?.msg || errorData?.message || "Erro ao buscar usuários";

      // 3. Lança o erro com a mensagem da API (ou a genérica como fallback)
      throw new Error(mensagemDeErro);
    }

    const data = await response.json();
    return data;
  }

  // Personalização dos botões usando o ConstrutorBotao que você enviou
  configurarAcoesPadrao(builder: ConstrutorAcoesPadrao): void {
    builder.adicionar.definirRotulo("Novo Usuário").definirVariante("default");
    builder.editar.definirRotulo("Editar Usuário").definirVariante("outline");
  }

  // Mapeamento das ações disparadas pelos botões da GenericPage
  aoClicarAdicionar() {
    this.actions.onAdd();
  }
  aoClicarEditar(item: UsuarioType) {
    this.actions.onEdit(item);
  }
  aoClicarVisualizar(item: UsuarioType) {
    this.actions.onView(item);
  }
  aoClicarExcluir(item: UsuarioType) {
    this.actions.onDelete(item);
  }
}
