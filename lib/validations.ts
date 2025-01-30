import { z } from "zod";

export const SignUpSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  universityCard: z.string().nonempty("University card is required"),
  universityId: z.coerce.number().min(1, "University ID is required"),
});

export const SignInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
