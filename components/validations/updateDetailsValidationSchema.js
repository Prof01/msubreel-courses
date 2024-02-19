import { z } from "zod";

export const updateDetailsValidationSchema = z.object({
    firstName: z.string().min(1, {
        message: "First Name is required",
      }),
      lastName: z.string().min(1, {
        message: "Last Name is required",
      }),
      phoneNumber: z.string().min(10, { message: "Must be a valid phone number" }),
  });
  
 export const UpdateDetailsFormValues = z.infer;