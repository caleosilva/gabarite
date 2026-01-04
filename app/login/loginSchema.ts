import * as z from "zod";

export const loginSchema = z.object({
  email: z.email("Insira um e-mail válido"),
  senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export type LoginValues = z.infer<typeof loginSchema>;