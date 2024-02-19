import { z } from "zod";

export const changePasswordValidationSchema = z.object({
    password: z.string().min(1, {
      message: "New Password is required",
    }),
    password1: z.string().min(1, {
      message: "Current Password is required",
    }),
    password2: z.string().min(1, {
      message: "Confirm Password is required",
    }),
  })
  .superRefine(({ password2, password }, ctx) => {
    if (password2 !== password) {
      ctx.addIssue({
        code: "custom",
        path: ['password2'],
        message: "The passwords did not match"
      });
    }
  });
  
 export const ChangePasswordFormValues = z.infer;