import { Acao, obterAcoesCRUD } from "../enum/acao";
import { Recurso } from "../enum/recurso";
import { Permissao } from "../types";

export const estudante: Permissao[] = [
  { 
    recurso: Recurso.DASHBOARD, 
    acoes: [Acao.VISUALIZAR] 
  },
  { 
    recurso: Recurso.ESTUDO, 
    acoes: [] 
  },
  {
    recurso: Recurso.CONCURSO,
    acoes: [Acao.VISUALIZAR, Acao.LISTAR],
  },
  {
    recurso: Recurso.BANCA,
    acoes: [Acao.VISUALIZAR, Acao.LISTAR],
  },
  {
    recurso: Recurso.QUESTAO,
    acoes: [Acao.VISUALIZAR, Acao.LISTAR],
  },
  {
    recurso: Recurso.ORGAO,
    acoes: [Acao.VISUALIZAR, Acao.LISTAR],
  },
  {
    recurso: Recurso.DISCIPLINA,
    acoes: [Acao.VISUALIZAR, Acao.LISTAR],
  },
  {
    recurso: Recurso.PERFIL,
    acoes: [Acao.VISUALIZAR, Acao.EDITAR],
  },
];