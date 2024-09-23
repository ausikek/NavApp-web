import { z } from "zod";
import { userLoginSchema } from "@/DTOs";

export type UserLogin = z.infer<typeof userLoginSchema>;
