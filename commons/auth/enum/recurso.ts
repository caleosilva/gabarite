export const Recurso = {
  DASHBOARD:  { label: 'Dashboard',  value: 'dashboard' },
  ESTUDO:     { label: 'Estudo',     value: 'estudo' },
  USUARIO:    { label: 'Usuário',    value: 'usuario' },
  CONCURSO:   { label: 'Concurso',   value: 'concurso' },
  BANCA:      { label: 'Banca',      value: 'banca' },
  QUESTAO:    { label: 'Questão',    value: 'questao' },
  ORGAO:      { label: 'Órgão',      value: 'orgao' },
  DISCIPLINA: { label: 'Disciplina', value: 'disciplina' },
  PERFIL:     { label: 'Perfil',     value: 'perfil' },
} as const;

export type RecursoType = (typeof Recurso)[keyof typeof Recurso];

export const getRecursoByValue = (value: string): RecursoType | undefined => {
  return Object.values(Recurso).find((r) => r.value === value);
};

export const obterTodosRecursos = (): RecursoType[] => {
  return Object.values(Recurso);
};
