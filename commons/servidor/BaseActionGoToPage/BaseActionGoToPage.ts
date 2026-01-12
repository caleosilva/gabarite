import { Model } from "mongoose";
import { BaseAction } from "../BaseAction/BaseAction";
import { AppError, HttpCode } from "../AppError/AppError";

export interface GoToPageInput {
  page: number;
  pageSize: number;
  filterField?: string;
  filterValue?: string;
}

export class BaseActionGoToPage<T> extends BaseAction<GoToPageInput, { data: T[]; total: number }> {
  constructor(
    protected model: Model<T>, 
    protected selectFields: string | Partial<Record<keyof T, number | boolean>> = "" 
  ) {
    super();
  }

  protected async validate(input: GoToPageInput): Promise<void> {
    if (input.page < 0 || input.pageSize <= 0) {
      throw new AppError(HttpCode.BAD_REQUEST, "Parâmetros de paginação inválidos.");
    }
  }

  protected async save(input: GoToPageInput): Promise<{ data: T[]; total: number }> {
    const { page, pageSize, filterField, filterValue } = input;

    // 1. Filtro base
    const query: any = { excluido: false };

    // 2. Filtro de busca dinâmico
    if (filterField && filterValue) {
      query[filterField] = { $regex: filterValue, $options: "i" };
    }

    const skip = page * pageSize;

    // 3. Execução
    const [data, total] = await Promise.all([
      this.model.find(query)
        .select(this.selectFields as any) // Cast para 'any' apenas aqui para o Mongoose aceitar a união de tipos
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pageSize)
        .lean(),

      this.model.countDocuments(query)
    ]);

    return {
      data: data as unknown as T[],
      total,
    };
  }
}