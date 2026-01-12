export abstract class BaseService<T> {
  abstract goToPage(params: any): Promise<{ data: T[]; total: number }>;
  abstract visualizar(id: string): Promise<T>;
  abstract cadastrar(data: T): Promise<T>;
  abstract editar(id: string, data: T): Promise<T>;
  abstract excluir(id: string): Promise<void>;
}