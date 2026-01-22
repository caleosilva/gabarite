import { Recurso } from "./enum/recurso";
import { Acao } from "./enum/acao";

export interface Permissao {
  recurso: Recurso;
  acoes: Acao[];
}