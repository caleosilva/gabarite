import { AcaoType } from "./enum/acao";
import { RecursoType } from "./enum/recurso";
import { Cargo } from "./enum/cargo";
import { administrador } from "./permissoes/administrador";
import { estudante } from "./permissoes/estudante";
import { Permissao } from "./types";


export const CONFIGURACAO_CARGOS: Record<string, Permissao[]> = {
  [Cargo.ADMINISTRADOR.value]: administrador,
  [Cargo.ESTUDANTE.value]: estudante,
};


export function possuiPermissao(
  cargo: string,
  recurso: string,
  acao: string
): boolean {
  const permissoes = CONFIGURACAO_CARGOS[cargo];
  if (!permissoes) return false;

  const permissaoRecurso = permissoes.find((p) => p.recurso === recurso);
  if (!permissaoRecurso) return false;

  return permissaoRecurso.acoes.includes(acao);
}