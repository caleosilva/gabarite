import { Acao, obterAcoesCRUD } from "../enum/acao";
import { Recurso } from "../enum/recurso";
import { Permissao } from "../types";

export const estudante: Permissao[] = [
  { 
    recurso: Recurso.DASHBOARD.value,
    acoes: [Acao.VISUALIZAR.value] 
  },
  { 
    recurso: Recurso.ESTUDO.value, 
    acoes: [] 
  },
  {
    recurso: Recurso.CONCURSO.value,
    acoes: [Acao.VISUALIZAR.value, Acao.LISTAR.value],
  },
  {
    recurso: Recurso.BANCA.value,
    acoes: [Acao.VISUALIZAR.value, Acao.LISTAR.value],
  },
  {
    recurso: Recurso.QUESTAO.value,
    acoes: [Acao.VISUALIZAR.value, Acao.LISTAR.value],
  },
  {
    recurso: Recurso.ORGAO.value,
    acoes: [Acao.VISUALIZAR.value, Acao.LISTAR.value],
  },
  {
    recurso: Recurso.DISCIPLINA.value,
    acoes: [Acao.VISUALIZAR.value, Acao.LISTAR.value],
  },
  {
    recurso: Recurso.PERFIL.value,
    acoes: [Acao.VISUALIZAR.value, Acao.EDITAR.value],
  },
];