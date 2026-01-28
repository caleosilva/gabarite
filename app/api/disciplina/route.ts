import { NextRequest } from "next/server";
import { BaseRoute } from "@/commons/servidor/BaseRoute/BaseRoute";
import { DisciplinaService } from "./disciplinaService";

class DisciplinaRoute extends BaseRoute {
  protected service = new DisciplinaService();


  public async GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    return this.handle(req, "GET", async () => {
      if (id) {
        return this.service.visualizar(id);
      }

      return this.service.goToPage({
        page: parseInt(searchParams.get("page") || "0"),
        pageSize: parseInt(searchParams.get("pageSize") || "12"),
        filterField: searchParams.get("filterField") || undefined,
        filterValue: searchParams.get("filterValue") || undefined,
      });
    });
  }

  public async POST(req: NextRequest) {
    return this.handle(req, "POST", async () => {
      const body = await req.json();
      return this.service.cadastrar(body);
    });
  }

  public async PUT(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    return this.handle(req, "PUT", async () => {
      if (!id) throw new Error("ID não fornecido para atualização.");
      const body = await req.json();
      return this.service.editar(id, body);
    });
  }

  public async DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    return this.handle(req, "DELETE", async () => {
      if (!id) throw new Error("ID não fornecido para exclusão.");
      return this.service.excluir(id);
    });
  }
}

const route = new DisciplinaRoute();

export const GET = (req: NextRequest) => route.GET(req);
export const POST = (req: NextRequest) => route.POST(req);
export const PUT = (req: NextRequest) => route.PUT(req);
export const DELETE = (req: NextRequest) => route.DELETE(req);