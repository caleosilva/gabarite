// import { NextRequest } from "next/server";
// import { UsuarioApiController } from "./controller";
// import connectToDatabase from "@/utils/db";

// const controller = new UsuarioApiController();

// async function ensureDb() {
//   await connectToDatabase();
// }

// export async function GET(req: NextRequest) {
//   await ensureDb();
//   return controller.execute(req, "GET");
// }

// export async function POST(req: NextRequest) {
//   await ensureDb();
//   return controller.execute(req, "POST");
// }

// export async function PUT(req: NextRequest) {
//   await ensureDb();
//   return controller.execute(req, "PUT");
// }

// export async function DELETE(req: NextRequest) {
//   await ensureDb();
//   return controller.execute(req, "DELETE");
// }