import { z } from "zod";

const NewUserSchema = z.object({
  fullName: z.string().min(3).max(255),
  email: z.string().email().min(3).max(255),
  password: z.string().min(3).max(255),
  phoneNumber: z.string().min(3).max(255),
});

type NewUserType = z.infer<typeof NewUserSchema>;

export { NewUserSchema, NewUserType };
