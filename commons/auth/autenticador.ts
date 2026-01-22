import { Acao } from "./enum/acao";
import { Recurso } from "./enum/recurso";
import { Cargo } from "./enum/cargo";
import { administrador } from "./permissoes/administrador";
import { estudante } from "./permissoes/estudante";


interface Permissao {
  recurso: Recurso;
  acoes: Acao[];
}

export const CONFIGURACAO_CARGOS: Record<Cargo, Permissao[]> = {
  [Cargo.ADMINISTRADOR]: administrador,
  [Cargo.ESTUDANTE]: estudante,
};

/**
 * Verifica se um cargo possui permissão para executar uma ação em um recurso.
 */
export function possuiPermissao(
  cargo: string,
  recurso: string,
  acao: string
): boolean {
  // Validar se o cargo existe
  const config = CONFIGURACAO_CARGOS[cargo as Cargo];
  if (!config) return false;

  // Buscar o recurso solicitado
  const permissaoRecurso = config.find((p) => p.recurso === recurso);
  if (!permissaoRecurso) return false;

  // Verificar se a ação solicitada está incluída na lista de ações permitidas
  return permissaoRecurso.acoes.includes(acao as Acao);
}
