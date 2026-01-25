import { obterTodasAcoes, obterAcoesLeitura } from "../config/acao";
import { Recurso } from "../config/recurso";
import { Permissao } from "../types";

export const administrador: Permissao[] = [
  { 
    recurso: Recurso.DASHBOARD.value, 
    acoes: obterTodasAcoes() 
  },
  { 
    recurso: Recurso.ESTUDO.value, 
    acoes: obterTodasAcoes() 
  },
  {
    recurso: Recurso.USUARIO.value,
    acoes: obterAcoesLeitura(),
  },
  {
    recurso: Recurso.CONCURSO.value,
    acoes: obterTodasAcoes(),
  },
  {
    recurso: Recurso.BANCA.value,
    acoes: obterTodasAcoes(),
  },
  {
    recurso: Recurso.QUESTAO.value,
    acoes: obterTodasAcoes(),
  },
  {
    recurso: Recurso.ORGAO.value,
    acoes: obterTodasAcoes(),
  },
  {
    recurso: Recurso.DISCIPLINA.value,
    acoes: obterTodasAcoes(),
  },
  {
    recurso: Recurso.PERFIL.value,
    acoes: obterTodasAcoes(),
  },
];