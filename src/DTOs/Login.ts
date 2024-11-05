import { z } from "zod";

export const userLoginSchema = z.object({
  email: z.string().email({ message: "E-mail inválido" }),
  password: z.string().min(1, { message: "Senha inválida" }),
});
