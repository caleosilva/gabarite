import { getServerSession } from "next-auth";

export class Autenticador {
  static async validar(): Promise<boolean> {
    const session = await getServerSession();
    if (!session) return false;
    return true;
  }
}