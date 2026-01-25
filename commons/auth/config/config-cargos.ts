import { Cargo } from "@/commons/auth/config/cargo";
import { Permissao } from "@/commons/auth/types";
import { administrador } from "@/commons/auth/permissoes/administrador";
import { estudante } from "@/commons/auth/permissoes/estudante";

export const CONFIGURACAO_CARGOS: Record<string, Permissao[]> = {
  [Cargo.ADMINISTRADOR.value]: administrador,
  [Cargo.ESTUDANTE.value]: estudante,
};