import { z } from "zod";

export const userLoginSchema = z.object({
  username: z.string().min(1, { message: "Usuário ou Senha inválidos" }),
  password: z.string().min(1, { message: "Usuário ou Senha inválidos" }),
});
