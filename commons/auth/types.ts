export interface Permissao {
  recurso: string; // Ou RecursoType['value'] se preferir tipagem estrita
  acoes: string[];
}