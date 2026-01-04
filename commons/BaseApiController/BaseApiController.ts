import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";
import connectToDatabase from "@/utils/db";
import Usuario from "@/models/Usuario";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

type RoleConfig = {
  [key in HttpMethod]?: string[]; // Ex: GET: ['Admin'], POST: ['Admin', 'Editor']
};

export interface PaginationParams {
    chaveFarmacia: string;
    page: number;
    pageSize: number;
    filterField?: string;
    filterValue?: string;
}

export abstract class BaseApiController {
  
  protected abstract permissions: RoleConfig;

  protected abstract getById(id: string, chaveFarmacia: string): Promise<any>;

  protected abstract goToPage(params: PaginationParams): Promise<{ data: any[]; total: number }>;

  protected async getDefaultList(chaveFarmacia: string): Promise<any[]> {
        throw { status: 405, message: "Listagem completa (sem paginação) não implementada." };
    }

  public async execute(req: NextRequest, method: HttpMethod): Promise<NextResponse> {
    try {
      // 1. Extração de Chave (Mesma lógica anterior)
      let chaveUsuario = req.nextUrl.searchParams.get("chaveUsuario");
      if (!chaveUsuario && (method === "POST" || method === "PUT" || method === "PATCH")) {
         try {
            const bodyClone = await req.clone().json();
            chaveUsuario = bodyClone.chaveUsuario;
         } catch (e) { console.log(e) }
      }

      // 2. Busca as permissões específicas para ESSE método
      const rolesForMethod = this.permissions[method];

      // Se não houver papéis definidos para o método, bloqueia por segurança
      if (!rolesForMethod) {
          return NextResponse.json({ error: `Método ${method} não configurado ou não permitido.` }, { status: 405 });
      }

      // 3. Valida Autenticação
      await this.validateSession(chaveUsuario, rolesForMethod);

      // 4. Executa
      switch (method) {
        case "GET": return await this.handleGet(req);
        case "POST": return await this.handlePost(req);
        case "PUT": return await this.handlePut(req);
        case "DELETE": return await this.handleDelete(req);
        case "PATCH": return await this.handlePatch(req);
        default: return NextResponse.json({ error: "Método não suportado" }, { status: 405 });
      }

    } catch (error) {
      return this.handleError(error);
    }
  }

  // --- Métodos que as filhas devem sobrescrever se precisarem suportar o verbo ---
  protected async handleGet(req: NextRequest): Promise<NextResponse> {
        const searchParams = req.nextUrl.searchParams;
        
        // Parâmetros de Autenticação e Identificação
        const chaveFarmacia = searchParams.get("chaveFarmacia");
        const idBuscar = searchParams.get("idBuscar");

        // Parâmetros de Paginação e Filtro
        const pageParam = searchParams.get("page");
        const pageSizeParam = searchParams.get("pageSize");
        const filterField = searchParams.get("filterField");
        const filterValue = searchParams.get("filterValue");

        if (!chaveFarmacia) {
            throw { status: 400, message: "A chave da farmácia é obrigatória." };
        }

        // 1. Busca por ID (Retorna item único)
        if (idBuscar) {
            const item = await this.getById(idBuscar, chaveFarmacia);
            if (item) return NextResponse.json({ data: item }, { status: 200 });
            throw { status: 404, message: "Item não encontrado." };
        } 
        
        // 2. Busca Paginada (Retorna lista + total)
        if (pageParam && pageSizeParam) {
            const pageIndex = parseInt(pageParam, 10) || 0;
            const pageSize = parseInt(pageSizeParam, 10) || 12;

            const resultadoPaginado = await this.goToPage({
                chaveFarmacia,
                page: pageIndex,
                pageSize: pageSize,
                filterField: filterField || undefined,
                filterValue: filterValue || undefined
            });
            
            // Assume que goToPage retorna { data: [], total: number }
            return NextResponse.json(resultadoPaginado, { status: 200 });
        }

        // 3. Fallback (Busca tudo - Chamamos o método padrão)
        else {
            const lista = await this.getDefaultList(chaveFarmacia);
            return NextResponse.json({ data: lista }, { status: 200 });
        }
    }

  protected async handlePost(req: NextRequest): Promise<NextResponse> {
    return NextResponse.json({ error: "Method POST not implemented" }, { status: 405 });
  }
  protected async handlePut(req: NextRequest): Promise<NextResponse> {
    return NextResponse.json({ error: "Method PUT not implemented" }, { status: 405 });
  }
  protected async handlePatch(req: NextRequest): Promise<NextResponse> {
    return NextResponse.json({ error: "Method PATCH not implemented" }, { status: 405 });
  }
  protected async handleDelete(req: NextRequest): Promise<NextResponse> {
    return NextResponse.json({ error: "Method DELETE not implemented" }, { status: 405 });
  }

  private async validateSession(chaveUsuario: string | null, acessosPermitidos: string[]) {
    // Se a lista de permissões incluir "PUBLIC", pula autenticação
    if (acessosPermitidos.includes("PUBLIC")) return;

    const session = await getServerSession();
    if (!session || !session.user) {
      throw { status: 401, message: "Você não está autenticado." };
    }

    if (chaveUsuario) {
        await connectToDatabase();
        const result = await Usuario.findOne({ _id: new mongoose.Types.ObjectId(chaveUsuario) }, { senha: 0 });

        if (!result || !result.tipoUsuario || !acessosPermitidos.includes(result.tipoUsuario)) {
            throw { status: 403, message: "Você não tem autorização para acessar esse recurso." };
        }
    }
  }

  // É INTERESSANE QUE AO INVÉS DE CONFLICT, VÁ POR CÓDIGO (CRIAR UM ENUM PRA ISSO? USAR OS CODIGO HTTP?)
  // --- Tratamento de Erro Centralizado ---
  private handleError(error: any): NextResponse {
    console.error("API Error:", error);

    // Erros jogados manualmente (throw { status: 401 ... })
    if (error.status && error.message) {
        return NextResponse.json({ error: error.message }, { status: error.status });
    }

    // Erros de Regra de Negócio (ex: CONFLICT)
    if (error instanceof Error) {
      if (error.message === "CONFLICT") {
        return NextResponse.json({ error: "Este registro já existe no sistema." }, { status: 409 });
      }
    }

    // Erro genérico
    return NextResponse.json({ error: "Ocorreu um erro interno no servidor." }, { status: 500 });
  }
}