export abstract class BaseAction<TInput, TOutput> {
  // 1. Validação (Lança erros se algo estiver errado)
  protected abstract validate(data: TInput): Promise<void>;

  // 2. A lógica principal
  protected abstract save(data: TInput): Promise<TOutput>;

  // 3. Gancho para operações pós-sucesso (ex: logs, limpar cache)
  protected async onSuccess(result: TOutput): Promise<void> {
    // Implementação opcional
  }

  public async run(data: TInput): Promise<TOutput> {
    await this.validate(data);
    const result = await this.save(data);
    await this.onSuccess(result);
    return result;
  }
}