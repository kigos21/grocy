import { z } from "zod";

// Login Form
export const loginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

// Register Form
export const registerFormSchema = z.object({
  name: z.string(),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8),
  password_confirmation: z.string().min(8),
});

export type RegisterFormValues = z.infer<typeof registerFormSchema>;
