import { z } from "zod";

export const userLoginSchema = z.object({
  username: z.string().min(1, { message: "Usuário inválido" }),
  password: z.string().min(1, { message: "Senha inválida" }),
});
