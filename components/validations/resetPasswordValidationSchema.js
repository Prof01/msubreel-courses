import { z } from "zod";

export const resetPasswordValidationSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }).email({
      message: "Must be a valid email",
    })
  });
  
 export const ResetPasswordFormValues = z.infer;