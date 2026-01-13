import * as z from "zod";
import { UsuarioType } from "@/models/Usuario";

export const createUsuarioFormSchema = (usuario?: UsuarioType) => {
  return z.object({
    // Nome: Obrigatório, remove espaços extras
    nome: z
      .string()
      .trim()
      .min(3, { message: "O nome deve ter pelo menos 3 caracteres" })
      .default(usuario?.nome || ""),

    // Email: Obrigatório e formatado
    email: z
      .email({ message: "Insira um e-mail válido" })
      .trim()
      .default(usuario?.email || ""),

    // Senha: Se vazia, vira undefined
    senha: z
      .string()
      .optional()
      .or(z.literal(""))
      .transform((val) => (val === "" ? undefined : val)),

    // Foto: Se vazia, vira undefined para não salvar string vazia no banco
    fotoUrl: z
      .url({ message: "URL da foto inválida" })
      .optional()
      .or(z.literal(""))
      .default(usuario?.fotoUrl || "")
      .transform((val) => (val === "" ? undefined : val)),

    // Admin: Booleano padrão
    isAdmin: z
      .boolean()
      .default(usuario?.isAdmin || false),

    // ID: Se for string vazia (novo usuário), vira undefined para o Mongo gerar um novo
    _id: z
      .string()
      .optional()
      .default(usuario?._id?.toString() || "")
      .transform((val) => (val === "" ? undefined : val)),
  });
};

// O tipo dos dados que entram no formulário (o que o React Hook Form gerencia)
export type UsuarioFormInput = z.input<ReturnType<typeof createUsuarioFormSchema>>;

// O tipo dos dados que saem do formulário (após os transforms, prontos para a API)
export type UsuarioFormOutput = z.output<ReturnType<typeof createUsuarioFormSchema>>;