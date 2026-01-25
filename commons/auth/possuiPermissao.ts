import { CONFIGURACAO_CARGOS } from "@/commons/auth/config/config-cargos";

export function possuiPermissao(
  cargo: string,
  recurso: string | undefined,
  acao: string
): boolean {
  if (!recurso) return false;

  const permissoes = CONFIGURACAO_CARGOS[cargo];
  if (!permissoes) return false;

  const permissaoRecurso = permissoes.find((p) => p.recurso === recurso);
  if (!permissaoRecurso) return false;

  return permissaoRecurso.acoes.includes(acao);
}