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
export const obterAcoesCRUD = (): AcaoType[] => {
  return [
    Acao.CADASTRAR,
    Acao.EDITAR,
    Acao.EXCLUIR,
    Acao.VISUALIZAR,
    Acao.ACESSAR_PAGINA,
  ];
};

export const obterAcoesLeitura = (): AcaoType[] => {
  return [Acao.VISUALIZAR, Acao.ACESSAR_PAGINA];
};

export const obterTodasAcoes = (): AcaoType['value'][] => {
  return Object.values(Acao).map((acao) => acao.value);
};
