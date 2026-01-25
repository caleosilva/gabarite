export const Acao = {
  CADASTRAR:      { label: 'Cadastrar',       value: 'cadastrar' },
  EDITAR:         { label: 'Editar',          value: 'editar' },
  EXCLUIR:        { label: 'Excluir',         value: 'excluir' },
  VISUALIZAR:     { label: 'Visualizar',      value: 'visualizar' },
  LISTAR:         { label: 'Listar',          value: 'listar' },
  ACESSAR_PAGINA: { label: 'Acessar Página',  value: 'acessar_pagina' },
} as const;

export type AcaoType = (typeof Acao)[keyof typeof Acao];

export const getAcaoByValue = (value: string): AcaoType | undefined => {
  return Object.values(Acao).find((r) => r.value === value);
};


// Funções utilitárias
export const obterAcoesCRUD = (): AcaoType['value'][] => {
  return [
    Acao.CADASTRAR.value,
    Acao.EDITAR.value,
    Acao.EXCLUIR.value,
    Acao.VISUALIZAR.value,
    Acao.ACESSAR_PAGINA.value,
  ];
};

export const obterAcoesLeitura = (): AcaoType['value'][] => {
  return [Acao.LISTAR.value, Acao.ACESSAR_PAGINA.value];
};

export const obterTodasAcoes = (): AcaoType['value'][] => {
  return Object.values(Acao).map((acao) => acao.value);
};
