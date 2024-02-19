import { z } from "zod";

export const submitNewPasswordValidationSchema = z.object({
    password: z.string().min(1, {
      message: "New Password is required",
    }),
    password1: z.string().min(1, {
      message: "Confirm Password is required",
    }),
  })
  .superRefine(({ password1, password }, ctx) => {
    if (password1 !== password) {
      ctx.addIssue({
        code: "custom",
        path: ['password1'],
        message: "The passwords did not match"
      });
    }
  });
  
 export const NewPasswordPasswordFormValues = z.infer;