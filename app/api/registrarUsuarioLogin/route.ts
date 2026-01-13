import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/utils/db";
import { UsuarioService } from "@/app/api/usuario/usuarioService";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();
    
    // Forçam que todo auto-cadastro NÃO seja admin por segurança
    const payload = { ...body, isAdmin: false };
    
    const service = new UsuarioService();
    const result = await service.cadastrar(payload);
    
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ msg: error.message }, { status: 400 });
  }
}