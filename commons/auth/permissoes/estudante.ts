import { Acao } from "../enum/acao";
import { Recurso } from "../enum/recurso";
import { Permissao } from "../types";

export const estudante: Permissao[] = [
  { 
    recurso: Recurso.DASHBOARD.value,
    acoes: [Acao.ACESSAR_PAGINA.value] 
  },
  { 
    recurso: Recurso.ESTUDO.value, 
    acoes: [Acao.ACESSAR_PAGINA.value] 
  },
  {
    recurso: Recurso.CONCURSO.value,
    acoes: [Acao.ACESSAR_PAGINA.value],
  },
  {
    recurso: Recurso.BANCA.value,
    acoes: [Acao.ACESSAR_PAGINA.value],
  },
  {
    recurso: Recurso.QUESTAO.value,
    acoes: [Acao.ACESSAR_PAGINA.value],
  },
  {
    recurso: Recurso.ORGAO.value,
    acoes: [Acao.ACESSAR_PAGINA.value],
  },
  {
    recurso: Recurso.DISCIPLINA.value,
    acoes: [Acao.ACESSAR_PAGINA.value],
  },
  {
    recurso: Recurso.PERFIL.value,
    acoes: [Acao.ACESSAR_PAGINA.value],
  },
  {
    recurso: Recurso.USUARIO.value,
    acoes: [],
  },
];