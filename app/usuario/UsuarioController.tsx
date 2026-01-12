import { ColumnDef } from "@tanstack/react-table";
import { 
  AbstractTableController, 
  ResultadoPaginado, 
  FiltroBusca, 
  ConstrutorAcoesPadrao 
} from "@/commons/interface/AbstractTableController/AbstractTableController";
import { UsuarioType } from "@/models/Usuario";
import { Badge } from "@/components/ui/badge";

export class UsuarioController extends AbstractTableController<UsuarioType> {
  constructor(
    private actions: {
      onAdd: () => void;
      onEdit: (item: UsuarioType) => void;
      onView: (item: UsuarioType) => void;
      onDelete: (item: UsuarioType) => void;
    }
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
        accessorKey: "isAdmin",
        header: "Perfil",
        cell: ({ row }) => (
          <Badge variant={row.original.isAdmin ? "default" : "secondary"}>
            {row.original.isAdmin ? "Admin" : "Usuário"}
          </Badge>
        ),
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

  // Integração real com seu backend/API
  async fetchData(
    indicePagina: number,
    tamanhoPagina: number,
    filtro?: FiltroBusca
  ): Promise<ResultadoPaginado<UsuarioType>> {
    const params = new URLSearchParams({
      page: (indicePagina + 1).toString(),
      limit: tamanhoPagina.toString(),
      ...(filtro?.value && { field: filtro.field, search: filtro.value }),
    });

    const response = await fetch(`/api/usuarios?${params.toString()}`);
    if (!response.ok) throw new Error("Erro ao buscar usuários");
    
    return response.json();
  }

  // Personalização dos botões usando o ConstrutorBotao que você enviou
  configurarAcoesPadrao(builder: ConstrutorAcoesPadrao): void {
    builder.adicionar.definirRotulo("Novo Usuário").definirVariante("default");
    builder.editar.definirRotulo("Editar Usuário").definirVariante("outline");
  }

  // Mapeamento das ações disparadas pelos botões da GenericPage
  aoClicarAdicionar() { this.actions.onAdd(); }
  aoClicarEditar(item: UsuarioType) { this.actions.onEdit(item); }
  aoClicarVisualizar(item: UsuarioType) { this.actions.onView(item); }
  aoClicarExcluir(item: UsuarioType) { this.actions.onDelete(item); }
}