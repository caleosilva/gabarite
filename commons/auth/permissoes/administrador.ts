import { obterTodasAcoes } from "../enum/acao";
import { Recurso } from "../enum/recurso";
import { Permissao } from "../types";

export const administrador: Permissao[] = [
  { 
    recurso: Recurso.DASHBOARD, 
    acoes: obterTodasAcoes() 
  },
  { 
    recurso: Recurso.ESTUDO, 
    acoes: obterTodasAcoes() 
  },
  {
    recurso: Recurso.USUARIO,
    acoes: obterTodasAcoes(),
  },
  {
    recurso: Recurso.CONCURSO,
    acoes: obterTodasAcoes(),
  },
  {
    recurso: Recurso.BANCA,
    acoes: obterTodasAcoes(),
  },
  {
    recurso: Recurso.QUESTAO,
    acoes: obterTodasAcoes(),
  },
  {
    recurso: Recurso.ORGAO,
    acoes: obterTodasAcoes(),
  },
  {
    recurso: Recurso.DISCIPLINA,
    acoes: obterTodasAcoes(),
  },
  {
    recurso: Recurso.PERFIL,
    acoes: obterTodasAcoes(),
  },
];