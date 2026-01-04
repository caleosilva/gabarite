import { NextRequest, NextResponse } from "next/server";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export abstract class IBaseApi {
  abstract execute(req: NextRequest, method: HttpMethod): Promise<NextResponse>;

  abstract handleGet(req: NextRequest): Promise<NextResponse>;

  abstract handlePost(req: NextRequest): Promise<NextResponse>;

  abstract handlePut(req: NextRequest): Promise<NextResponse>;
  
  abstract handlePatch(req: NextRequest): Promise<NextResponse>;
  
  abstract handleDelete(req: NextRequest): Promise<NextResponse>;
}