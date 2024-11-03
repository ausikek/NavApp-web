import { z } from "zod";

export const userRegistrationSchema = z
  .object({
    email: z.string().email({ message: "Email inválido" }),
    username: z.string().min(1, { message: "Usuário inválido" }),
    password: z.string().min(1, { message: "Senha inválida" }),
    confirmPassword: z.string().min(1, { message: "Senha inválida" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });
