import * as z from "zod";
import { BancaType } from "@/models/Banca";

export const createformCadastrarEditarSchema = (banca?: BancaType) => {
  return z.object({
    nome: z
      .string()
      .trim()
      .min(2, { message: "O nome deve ter pelo menos 2 caracteres" })
      .default(banca?.nome || ""),

    _id: z
      .string()
      .optional()
      .default(banca?._id?.toString() || "")
      .transform((val) => (val === "" ? undefined : val)),
  });
};

export type BancaFormInput = z.input<ReturnType<typeof createformCadastrarEditarSchema>>;
export type BancaFormOutput = z.output<ReturnType<typeof createformCadastrarEditarSchema>>;
