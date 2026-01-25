import { useMemo } from "react";
import { useSession } from "next-auth/react";
import { possuiPermissao } from "@/commons/auth/possuiPermissao";
import { Acao } from "@/commons/auth/config/acao";

import { MenuItem, MENU_CONFIG } from "../menu-config";
import {useAuthClient} from "@/commons/auth/hooks/useAuthClient";


export function useNavBar() {  
  const {cargo, isLoading} = useAuthClient();

  const menusAcessiveis = useMemo(() => {
    if (isLoading || !cargo) return [];

    const filtrarRecursivo = (items: MenuItem[]): MenuItem[] => {
      return items.map((item) => {

          if (item.children && item.children.length > 0) {
            const filhosFiltrados = filtrarRecursivo(item.children);
            
            if (filhosFiltrados.length > 0) {
              return { ...item, children: filhosFiltrados };
            }
            return null;
          }

          const temAcesso = !item.recurso || possuiPermissao(cargo, item.recurso, Acao.ACESSAR_PAGINA.value);

          return temAcesso ? item : null;
        })
        .filter((item): item is MenuItem => item !== null);
    };

    return filtrarRecursivo(MENU_CONFIG);
  }, [cargo, status]);

  return {
    menus: menusAcessiveis,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated"
  };
}