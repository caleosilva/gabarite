import { getServerSession } from "next-auth";
import { possuiPermissao } from "@/commons/auth/autenticador";
import { authOptions } from "@/lib/auth";
import { HttpCode, AppError } from "@/commons/servidor/AppError/AppError";

export abstract class BaseAction<TInput, TOutput> {

  protected abstract recurso: string;
  protected abstract acao: string;

  // 1. Validação (Lança erros se algo estiver errado)
  protected abstract validate(data: TInput): Promise<void>;

  // 2. A lógica principal
  protected abstract save(data: TInput): Promise<TOutput>;

  // 3. Gancho para operações pós-sucesso (ex: logs, limpar cache)
  protected async onSuccess(result: TOutput): Promise<void> {
    // Implementação opcional
  }

  protected async authorize(): Promise<void> {
    if (!this.recurso || !this.acao) {
      throw new AppError(HttpCode.INTERNAL_SERVER_ERROR, "Configuração de segurança incompleta (recurso/ação não definidos).");;
    }

    const session = await getServerSession(authOptions);

    if (!session) {
      throw new AppError(HttpCode.FORBIDDEN, "Não autenticado.");
    }

    const autorizado = possuiPermissao(
      session.user.cargo,
      this.recurso,
      this.acao
    );

    if (!autorizado) {
      throw new AppError(HttpCode.UNAUTHORIZED, `Acesso negado: ${this.acao} -> ${this.recurso}`);
    }
  }

  public async run(data: TInput): Promise<TOutput> {
    await this.authorize();
    await this.validate(data);
    const result = await this.save(data);
    await this.onSuccess(result);
    return result;
  }
}