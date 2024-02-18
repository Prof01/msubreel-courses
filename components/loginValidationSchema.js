import { z } from "zod";

export const loginValidationSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }).email({
      message: "Must be a valid email",
    }),
    password: z.string().min(1, {
      message: "Password is required",
    }),
  });
  
 export const LoginFormValues = z.infer;