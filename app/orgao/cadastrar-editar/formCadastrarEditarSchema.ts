import * as z from "zod";
import { OrgaoType } from "@/models/Orgao";

export const createformCadastrarEditarSchema = (orgao?: OrgaoType) => {
  return z.object({
    nome: z
      .string()
      .trim()
      .min(2, { message: "O nome deve ter pelo menos 2 caracteres" })
      .default(orgao?.nome || ""),

    _id: z
      .string()
      .optional()
      .default(orgao?._id?.toString() || "")
      .transform((val) => (val === "" ? undefined : val)),
  });
};

export type OrgaoFormInput = z.input<ReturnType<typeof createformCadastrarEditarSchema>>;
export type OrgaoFormOutput = z.output<ReturnType<typeof createformCadastrarEditarSchema>>;
