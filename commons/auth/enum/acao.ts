export enum Acao {
  CADASTRAR = 'cadastrar',
  EDITAR = 'editar',
  EXCLUIR = 'excluir',
  VISUALIZAR = 'visualizar',
  LISTAR = 'listar'
}

export const obterAcoesCRUD = (): Acao[] => {
  return [
    Acao.CADASTRAR,
    Acao.EDITAR,
    Acao.EXCLUIR,
    Acao.VISUALIZAR,
    Acao.LISTAR
  ];
}

export const obterAcoesLeitura = (): Acao[] => {
  return [Acao.VISUALIZAR, Acao.LISTAR];
}

export const obterTodasAcoes = (): Acao[] => {
  return Object.values(Acao) as Acao[];
}