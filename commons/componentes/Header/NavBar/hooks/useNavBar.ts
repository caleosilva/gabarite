import { useMemo } from "react";
import { useSession } from "next-auth/react";
import { possuiPermissao } from "@/commons/auth/possuiPermissao";
import { Acao } from "@/commons/auth/config/acao";

export interface MenuItem {
  title: string;
  href?: string;
  recurso?: string;
  description?: string;
  children?: MenuItem[];
}

export const MENU_CONFIG: MenuItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    recurso: "dashboard",
  },
  {
    title: "Estudo",
    href: "/estudo",
    recurso: "estudo",
  },
  {
    title: "Auxiliares",
    children: [
      {
        title: "Concurso",
        href: "/concurso",
        recurso: "concurso",
        description: "Gerencie os editais e certames disponíveis.",
      },
      {
        title: "Órgão",
        href: "/orgao",
        recurso: "orgao",
        description: "Cadastro de instituições e órgãos públicos.",
      },
      {
        title: "Banca",
        href: "/banca",
        recurso: "banca",
        description: "Organizadoras de concursos (Ex: FGV, Cebraspe).",
      },
      {
        title: "Disciplina",
        href: "/disciplina",
        recurso: "disciplina",
        description: "Matérias e conteúdos programáticos.",
      },
      {
        title: "Questão",
        href: "/questao",
        recurso: "questao",
        description: "Banco de questões para simulados e treinos.",
      },
    ],
  },
  {
    title: "Usuários",
    href: "/usuario",
    recurso: "usuario",
  },
];

export function useNavBar() {
  const { data: session, status } = useSession();
  
  const cargo = session?.user?.cargo;

  const menusAcessiveis = useMemo(() => {
    if (status === "loading" || !cargo) return [];

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