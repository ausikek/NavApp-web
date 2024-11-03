import { z } from "zod";
import { userLoginSchema, userRegistrationSchema } from "@/DTOs";

export type UserLogin = z.infer<typeof userLoginSchema>;
export type UserRegistration = z.infer<typeof userRegistrationSchema>;
