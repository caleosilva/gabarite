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