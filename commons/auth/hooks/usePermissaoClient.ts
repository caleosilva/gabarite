import { useCallback } from "react";
import { useAuthComponente } from "./useAuthComponente";
import { CONFIGURACAO_CARGOS } from "@/commons/auth/config/config-cargos";

export function usePermissaoClient() {
  const { cargo } = useAuthComponente();

  const temPermissao = useCallback(
    (recurso: string, acao: string): boolean => {
      if (!recurso) return false;

      const permissoes = CONFIGURACAO_CARGOS[cargo];
      if (!permissoes) return false;

      const permissaoRecurso = permissoes.find((p: any) => p.recurso === recurso);
      if (!permissaoRecurso) return false;

      return permissaoRecurso.acoes.includes(acao);
    },
    [cargo],
  );

  return {
    temPermissao,
    cargo,
  };
}
