import { z } from "zod";

export const signupValidationSchema = z.object({
    firstName: z.string().min(1, {
      message: "First Name is required",
    }),
    lastName: z.string().min(1, {
      message: "Last Name is required",
    }),
    phoneNumber: z.string().min(10, { message: "Must be a valid phone number" }),
    email: z.string().min(1, { message: "Email is required" }).email({
      message: "Must be a valid email",
    }),
    password: z.string().min(8, {
      message: "Password is must be at least 8 characters",
    }),
    password2: z.string().min(8, {
      message: "Password is must be at least 8 characters",
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
  
 export const SignupFormValues = z.infer;