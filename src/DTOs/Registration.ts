import { z } from "zod";

export const userRegistrationSchema = z
  .object({
    email: z.string().email({ message: "Email inválido" }),
    name: z
      .string()
      .min(1, { message: "Usuário inválido" })
      .regex(/^[a-zA-Z]+$/, {
        message: "Nome inválido: utilize apenas letras",
      }),
    password: z
      .string()
      .min(8, { message: "A senha precisa ter no mínimo 8 caractéres" }),
    confirmPassword: z.string().min(8, { message: "Senha inválida" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });
