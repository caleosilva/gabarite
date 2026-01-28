import * as z from "zod";
import { DisciplinaType } from "@/models/Disciplina";

export const createformCadastrarEditarSchema = (disciplina?: DisciplinaType) => {
  return z.object({
    nome: z
      .string()
      .trim()
      .min(2, { message: "O nome deve ter pelo menos 2 caracteres" })
      .default(disciplina?.nome || ""),

    _id: z
      .string()
      .optional()
      .default(disciplina?._id?.toString() || "")
      .transform((val) => (val === "" ? undefined : val)),
  });
};

export type DisciplinaFormInput = z.input<ReturnType<typeof createformCadastrarEditarSchema>>;
export type DisciplinaFormOutput = z.output<ReturnType<typeof createformCadastrarEditarSchema>>;
